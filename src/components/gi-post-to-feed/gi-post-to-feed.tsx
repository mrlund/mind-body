import { Component, Element, State, Prop } from '@stencil/core';
import { tap } from 'rxjs/operators';

@Component({
    tag: 'gi-post-to-feed',
    styleUrl: 'gi-post-to-feed.css'
})
export class GiPostToFeed {

    @Element()
    el: HTMLElement;

    dataSvc: HTMLGiDataProviderElement;

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
    }

    submitPost() {
        let formData = new FormData(this.el.querySelector("form")) as any;
        var data = {};
        formData.forEach(function (value, key) {
            data[key] = value;
        });
        this.dataSvc.saveData(data, "feed");
        //TODO can we return data from the dataSvc so we know if it's successful and can update the form? (Perhaps replace it with the post itself?)
    }

    render() {
        return (
            <ion-card>
                <ion-card-content>
                    <form>
                        <ion-card-title>Great White Wall</ion-card-title>
                        <ion-item>
                            <ion-label>Public</ion-label>
                            <ion-radio slot="end" color="danger" name="true"></ion-radio>
                        </ion-item>
                        <ion-item>
                            <ion-input required type="text" placeholder="Post Text"></ion-input>
                        </ion-item>
                        <ion-button size="small">Post</ion-button>
                    </form>
                </ion-card-content>
            </ion-card>
        );
    }
}