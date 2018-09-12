import { Component, Element, State, Prop } from '@stencil/core';
import { tap } from 'rxjs/operators';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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

    // @Prop({ connect: 'ion-toast-controller' })
    // toastCtrl: HTMLIonToastControllerElement;

    componentDidLoad() {
        let node = this.el.parentElement;
        while (node.parentElement && !this.dataSvc) {
            if (node.nodeName == "GI-DATA-PROVIDER") {
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

    selectOption(evt, question, option) {
        evt.target.parentElement.childNodes.forEach(e => e.classList.remove("selected"));
        evt.target.classList.add("selected");
        this.dataSvc.saveData(
            {
                QuestionId: question.questionId,
                Question: question.question,
                Response: option.option,
                ResponseType: question.responseType,
                ResponseId: 1,
                ResponseName: "demo",
                CourseClassId: 1,
                ExtraResponseData: ""
            }, "/api/student/quiz-response")
            .subscribe(x => {
                // this.presentToast('Success');
            }, error => {
                evt.target.classList.remove("selected");
                //  this.presentToast('There is an error');
            });

    }
    // async presentToast(message: string) {
    //     const toast = await this.toastCtrl.create({
    //         message: message,
    //         duration: 2000
    //     });
    //     await toast.present();
    // }
    renderOptions(question) {
        if (question.responseType == 1) {
            return (
                <ul>
                    {question.options.map(opt =>
                        <li onClick={(evt) => this.selectOption(evt, question, opt)}>{opt.option}</li>
                    )}
                </ul>
            )
        } else if (question.responseType == 2) {
            let options = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            return (
                <ul>
                    {options.map(opt =>
                        <li onClick={(evt) => this.selectOption(evt, question, opt)}>{opt}</li>
                    )}
                </ul>
            )
        } else {
            return (
                <div>
                    <input type="text" />
                    <input type="button" value="Suggest" />
                </div>
            )
        }
    }
    render() {
        return (
            this.questions.map(q =>
                <div class={'question'}>
                    <h3>{q.question}</h3>
                     <hr />
                    {this.renderOptions(q)}
                </div>
            )
        );
    }
}