import { Component, Element, State } from '@stencil/core';
import { tap } from 'rxjs/operators';


@Component({
    tag: 'gi-quiz',
    styleUrl: 'gi-quiz.css'
})
export class GiQuiz {

    @Element()
    el: HTMLElement;

    dataSvc: HTMLGiDataProviderElement;

    @State()
    questions: Array<any> = [];
    
    componentDidLoad() {
        let node = this.el.parentElement;
        while (node.parentElement && !this.dataSvc){
            if (node.nodeName == "GI-DATA-PROVIDER"){
                this.dataSvc = node as HTMLGiDataProviderElement;
            } else {
                node = node.parentElement;
            }
        }
        let data$ = this.dataSvc.getData("quiz").pipe(
            tap(val => this.questions = val)
        );
        data$.subscribe();
    }

    selectOption(evt, question, option){
        evt.target.parentElement.childNodes.forEach(e => e.classList.remove("selected"));
        evt.target.classList.add("selected");
        console.log(question, option);
        this.dataSvc.saveData({ questionId : question.questionId, question: question.question, answer: option.option});
    }

    render() {
        return (
            this.questions.map(q => 
                <div class={'question'}>
                    <h3>{q.question}</h3>
                    <ul>
                        {q.options.map(opt =>
                            <li onClick={(evt) => this.selectOption(evt, q, opt)}>{opt.option}</li>
                        )}
                    </ul>
                </div>
            )
        );
    }
}