import { Component, Element, State, Prop } from '@stencil/core';
import { tap } from 'rxjs/operators';

@Component({
    tag: 'gi-opinion',
    styleUrl: 'gi-opinion.scss'
})
export class GiOpinion {

    @Element()
    el: HTMLElement;

    dataSvc: HTMLGiDataProviderElement;

    @State()
    questions: Array<any> = [];

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
        console.log(question, option);
        this.dataSvc.saveData(
            {
                QuestionId: question.questionId,
                Question: question.question,
                Response: option,
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
    render() {
        return (
            this.questions.map(q =>
                <div >
                    <h3 class="question">{q.question}</h3>
                    <hr />
                    <ul>
                        <li onClick={(evt) => this.selectOption(evt, q, "Strongly agree")}><div class="icon-group"><ion-icon name="star"></ion-icon> <ion-icon name="star"></ion-icon></div>Strongly agree</li>
                        <li onClick={(evt) => this.selectOption(evt, q, "Agree")}><div class="icon-group"><ion-icon name="star"></ion-icon></div>Agree</li>
                        <li onClick={(evt) => this.selectOption(evt, q, "Not sure")}><div class="icon-group"><ion-icon name="star-half"></ion-icon></div>Not sure</li>
                        <li onClick={(evt) => this.selectOption(evt, q, "Disagree")}><div class="icon-group"><ion-icon name="star-outline"></ion-icon></div>Disagree</li>
                        <li onClick={(evt) => this.selectOption(evt, q, "Strongly disagree")}><div class="icon-group"><ion-icon name="star-outline"></ion-icon> <ion-icon name="star-outline"></ion-icon></div>Strongly disagree</li>
                    </ul>
                </div>
            )
        );
    }
}