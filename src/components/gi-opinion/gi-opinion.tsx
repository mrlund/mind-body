import { Component, Element, State, Prop, Method } from '@stencil/core';
import { tap } from 'rxjs/operators';

@Component({
    tag: 'gi-opinion',
    styleUrl: 'gi-opinion.scss'
})
export class GiOpinion {

    @Element()
    el: HTMLElement;

    dataSvc: HTMLGiDataProviderElement;

    @Prop()
    scale: string;

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
    @Method()
    getQuizResults(){
        let results = [];
        this.questions.forEach(x=>{
            if(x.response){
                results.push({question: x.question, response: x.response, extraData: x.extraData});
            }
        });
        //console.log(results);
        return results;
    }
    renderFivePointScale(q) {
        return ([
            <hr />,
            <ul>
                <li onClick={(evt) => this.selectOption(evt, q, "Strongly agree")}><div class="icon-group"><ion-icon name="star"></ion-icon> <ion-icon name="star"></ion-icon></div>Strongly agree</li>
                <li onClick={(evt) => this.selectOption(evt, q, "Agree")}><div class="icon-group"><ion-icon name="star"></ion-icon></div>Agree</li>
                <li onClick={(evt) => this.selectOption(evt, q, "Not sure")}><div class="icon-group"><ion-icon name="star-half"></ion-icon></div>Not sure</li>
                <li onClick={(evt) => this.selectOption(evt, q, "Disagree")}><div class="icon-group"><ion-icon name="star-outline"></ion-icon></div>Disagree</li>
                <li onClick={(evt) => this.selectOption(evt, q, "Strongly disagree")}><div class="icon-group"><ion-icon name="star-outline"></ion-icon> <ion-icon name="star-outline"></ion-icon></div>Strongly disagree</li>
            </ul>
        ]
        )
    }
    mapPointToValue(point){
        let values = [
            "Never",
            "Never",
            "Sometimes",
            "Sometimes",
            "Half of the time",
            "Half of the time",
            "Most of the time",
            "Most of the time",
            "Always",
            "Always",
            "Always"
        ]
        if (point == undefined){
            return values[5];
        }
        return values[point];
    }
    setQuestionResponse(question, evt){
        //console.log(evt);
        this.questions.forEach(x=>{
            if(x.question == question){
                x.response = evt.detail.value;
            }
        });
        this.questions = [...this.questions];
    }
    renderTenPointScale(q) {
        return (
            <div>
                <ion-item>
                    <ion-range onIonChange={(evt)=>this.setQuestionResponse(q.question, evt)} min="0" max="10" step="1" pin="true" snaps="true">
                        <ion-icon color="primary" size="small" slot="start" name="sunny"></ion-icon>
                        <ion-icon color="primary" slot="end" name="sunny"></ion-icon>
                    </ion-range>
                </ion-item>
                <div class="scale">
                    <p>Never</p>
                    <p class="selected">{this.mapPointToValue(q.response)}</p>
                    <p>Always</p>
                </div>
                <br />
                <hr />
            </div>
        )
    }
    render() {
        return (
            this.questions.map(q =>
                <div >
                    <h3 class="question">{q.question}</h3>
                    {
                        this.scale == "five-point" ? this.renderFivePointScale(q) : this.renderTenPointScale(q)
                    }
                </div>
            )
        );
    }
}