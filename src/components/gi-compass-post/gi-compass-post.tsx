import { Component, Element, State, Prop, Watch, Method, Event, EventEmitter, Listen } from '@stencil/core';
import { tap } from 'rxjs/operators';
@Component({
    tag: 'gi-compass-post',
    styleUrl: 'gi-compass-post.scss'
})
export class GiCompassPost {

    @Element()
    el: HTMLElement;

    @State() errorMessage: string;

    @State() successMessage: string;

    dataSvc: HTMLGiDataProviderElement;

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
        this.errorMessage = "";
        this.successMessage = "";
        var previousEl = this.el.previousElementSibling as HTMLGiOpinionElement;
        var data = previousEl.getQuizResults();
        if (data.length == 8) {
            var sectionObj = {};
            for (var i = 0; i < data.length; i++) {
                if (data[i] && data[i].extraData && data[i].extraData.compass) {
                    console.log(typeof sectionObj[data[i].extraData.compass]);
                    if (typeof sectionObj[data[i].extraData.compass] === 'undefined') {
                        sectionObj[data[i].extraData.compass] = 0;
                    }
                    sectionObj[data[i].extraData.compass] += data[i].response;
                }
            }
            var componentString = "<gi-compass";
            for (var propertyName in sectionObj) {
                sectionObj[propertyName] = Math.floor(sectionObj[propertyName] * 0.25);
                componentString += ' ' + propertyName + '="' + sectionObj[propertyName] + '"';
            }
            componentString += "></gi-compass>";
            this.dataSvc.getServerData("/api/compass/recent").subscribe(x => {
                combineObj = {};
                if (x && x.AppJsonData) {
                    var oldObj = JSON.parse(x.AppJsonData);
                    var combineObj = { ...oldObj, ...sectionObj };
                }
                else {
                    combineObj = sectionObj;
                }
                var isPublic = this.el.getElementsByClassName("IsPublic")[0] as HTMLInputElement;
                var appJsonData = JSON.stringify(combineObj);
                var postData = {
                    AppJsonData: appJsonData,
                    CourseClassId: 1,
                    PostText: componentString,
                    ExternalResourceUrl: "",
                    IsPublic: isPublic.checked,
                };
                console.log(postData);
                this.dataSvc.saveData(postData, "/api/compass/add/")
                    .subscribe(x => {
                        this.successMessage = "Posted Successfully";
                    }, error => {
                        this.errorMessage = "Something went wrong.";
                    });
            }, error => {
                this.errorMessage = "Something went wrong.";
            });
        }
        else {
            this.errorMessage = "Please answer all of the above questions";
        }
    }

    getTokenData(): any {
        let tokenStr = window.localStorage["currentUser"];
        if (tokenStr) {
            let token = JSON.parse(tokenStr);
            token = JSON.parse(token);
            if (new Date(token["Expiration"]).getTime() > new Date().getTime()) {
                return token;
            }
        }
        return null;
    }

    renderUserInfo() {
        var tokenInfo = this.getTokenData();
        if (tokenInfo != null && tokenInfo.Token) {
            return (
                <ion-avatar class="header-avatar" slot="end">
                    {tokenInfo.ProfileImageUrl
                        ? <img src={tokenInfo.ProfileImageUrl} />
                        : <img src="/assets/img/avatar.png" />
                    }
                </ion-avatar>
            )
        }
        else {
            return (
                <ion-button slot="end" href="/login">Login to Post</ion-button>
            );
        }
    }
    render() {
        const userInfo = this.renderUserInfo();
        return (
            <div class="compass-post">
                <div class="compass-post-header">Great White Wall
                    {userInfo}
                </div>
                <div class="compass-post-body">
                    <form>
                        <ion-item>
                            <ion-label>Public</ion-label>
                            <ion-radio class="IsPublic" slot="end" color="primary" value="IsPublic" name="IsPublic"></ion-radio>
                        </ion-item>
                        <gi-compass></gi-compass>
                        <ion-item class="footer">
                            <div>
                                <div class="error">{this.errorMessage}</div>
                                <div class="success">{this.successMessage}</div>
                            </div>
                            <ion-button slot="end" size="default" onClick={(evt) => this.submitPost()} disabled={this.getTokenData() == null} >Post</ion-button>
                        </ion-item>
                    </form>
                </div>
            </div >
        );
    }
}