import { Component, Element, State, Prop, Listen } from '@stencil/core';
import { tap } from 'rxjs/operators';

@Component({
    tag: 'gi-poll',
    styleUrl: 'gi-poll.scss'
})
export class GiPoll {

    @Element()
    el: HTMLElement;

    dataSvc: HTMLGiDataProviderElement;

    @State()
    questions: Array<any> = [];


    //Any child component can liste for server events like
    @Listen('body:receivedSignalREvent')
    gotServerUpdate(evt) {
        console.log(evt.detail);
    }
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
        //console.log(question, option);
        this.dataSvc.callSignalR(
            {
                questionId: question.questionId,
                question: question.question,
                answer: option.option,
                responseType: question.responseType
            }, "send");
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
                <ion-item>
                    <ion-label>Choose Option <ion-icon name="arrow-back" mode="ios"></ion-icon></ion-label>
                    <ion-select id="customAlertSelect" interface="alert" >
                        <ion-select-option value="bacon">Bacon</ion-select-option>
                        <ion-select-option value="olives">Black Olives</ion-select-option>
                        <ion-select-option value="xcheese">Extra Cheese</ion-select-option>
                        <ion-select-option value="peppers">Green Peppers</ion-select-option>
                        <ion-select-option value="mushrooms">Mushrooms</ion-select-option>
                        <ion-select-option value="onions">Onions</ion-select-option>
                        <ion-select-option value="pepperoni">Pepperoni</ion-select-option>
                        <ion-select-option value="pineapple">Pineapple</ion-select-option>
                        <ion-select-option value="sausage">Sausage</ion-select-option>
                        <ion-select-option value="Spinach">Spinach</ion-select-option>
                    </ion-select>
                </ion-item>

            )
        } else {
            return (
                <div>

                    <input slot="start" type="text" placeholder="Type suggestion" />

                    <ion-item>
                        <ion-button class="suggetion-btn" size="default" slot="end" color="primary">ADD SUGGESTION</ion-button>
                    </ion-item>
                </div>
            )
        }
    }
    render() {
        return (
            this.questions.map(q =>
                <div class={'question'}>
                    <h3>{q.question}</h3>
                    {this.renderOptions(q)}
                </div>
            )
        );
    }
}