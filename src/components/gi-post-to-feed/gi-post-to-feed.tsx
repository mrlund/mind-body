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

        //let formData = new FormData(this.el.querySelector("form")) as any;
        var postText = this.el.getElementsByClassName("PostText")[0] as HTMLInputElement;
        var isPublic = this.el.getElementsByClassName("IsPublic")[0] as HTMLInputElement;
        var data = {
            PostText: postText.value,
            IsPublic: isPublic.checked,
            CourseClassId: 1,
            ExternalResourceUrl: ""
        };
        console.log(data);
        this.dataSvc.saveData(data, "/api/class/feed")
            .subscribe(x => {
                console.log("success");
                // this.presentToast('Success');
            }, error => {
                console.log("error");
                //  this.presentToast('There is an error');
            });;
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
                            <ion-radio class="IsPublic" slot="end" color="primary" value="IsPublic" name="IsPublic"></ion-radio>
                        </ion-item>
                        <ion-item>
                            <ion-input class="PostText" required type="text" placeholder="Post Text" name="PostText"></ion-input>
                        </ion-item>
                        <ion-button onClick={(evt) => this.submitPost()} size="small">Post</ion-button>
                    </form>
                </ion-card-content>
            </ion-card>
        );
    }
}