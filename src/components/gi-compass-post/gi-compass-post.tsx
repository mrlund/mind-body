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

    @State() resiliance: number = 0;
    @State() care: number = 0;
    @State() compassData: any = {};

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
        //this.loadOldData();
    }
    componentWillUpdate() {
        console.log('Component will update and re-render');
    }

    @Method()
    renderCompass(data) {
        var sectionObj = {};
        for (var i = 0; i < data.length; i++) {
            if (data[i] && data[i].extraData && data[i].extraData.compass) {
                if (typeof sectionObj[data[i].extraData.compass] === 'undefined') {
                    sectionObj[data[i].extraData.compass] = 0;
                }
                sectionObj[data[i].extraData.compass] += data[i].response || 0;
            }
        }
        for (var propertyName in sectionObj) {
            sectionObj[propertyName] = Math.floor(sectionObj[propertyName] * 0.25);
        }
        console.log(sectionObj)

    }

    loadOldData() {
        this.dataSvc.getServerData("/api/compass/recent").subscribe((x) => {
            if (x && x.AppJsonData) {
                var obj = JSON.parse(x.AppJsonData)
                this.compassData = { ...this.compassData, ...obj };
                const compassCmp = this.el.querySelector('gi-compass') as HTMLGiCompassElement;
                compassCmp.drawOnCompass();
                // compassCmp.drawOnCompass()
            }
        });
    }

    submitPost() {
        debugger
        this.errorMessage = "";
        this.successMessage = "";
        var previousEl = this.el.previousElementSibling as HTMLGiOpinionElement;
        var data = previousEl.getQuizResults();
        if (data.length == 8) {
            var sectionObj = {};
            for (var i = 0; i < data.length; i++) {
                if (data[i] && data[i].extraData && data[i].extraData.compass) {
                    if (typeof sectionObj[data[i].extraData.compass] === 'undefined') {
                        sectionObj[data[i].extraData.compass] = 0;
                    }
                    sectionObj[data[i].extraData.compass] += data[i].response;
                }

            }

            this.dataSvc.getServerData("/api/compass/recent").subscribe(x => {
                combineObj = {};
                if (x && x.AppJsonData) {
                    var oldObj = JSON.parse(x.AppJsonData);
                    for (var propertyName in oldObj) {
                        oldObj[propertyName] = Math.floor(oldObj[propertyName] * 4);
                    }
                    var combineObj = { ...oldObj, ...sectionObj };
                }
                else {
                    combineObj = sectionObj;
                }
                var componentString = "<gi-compass";
                for (var propertyName in combineObj) {
                    combineObj[propertyName] = Math.floor(combineObj[propertyName] * 0.25);
                    componentString += ' ' + propertyName + '="' + combineObj[propertyName] + '"';
                }
                componentString += "></gi-compass>";
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
                        {/*<gi-compass resiliance={this.compassData && this.compassData.resiliance ? this.compassData.resiliance : "0"} care={this.compassData && this.compassData.care ? this.compassData.care : "0"} emotions={this.compassData && this.compassData.emotions ? this.compassData.emotions : "0"} relationship={this.compassData && this.compassData.relationship ? this.compassData.relationship : "0"}></gi-compass>*/}
                        <gi-compass></gi-compass>
                        <ion-item class="footer">
                            <div>
                                <div class="error">{this.errorMessage}</div>
                                <div class="success">{this.successMessage}</div>
                            </div>
                            <ion-button slot="end" size="default" onClick={(evt) => this.submitPost()} disabled={this.getTokenData() == null} >Post</ion-button>
                        </ion-item>
                    </form>
                    {/*<gi-compass resiliance={this.compassData && this.compassData.resiliance ? this.compassData.resiliance : 0} care={this.compassData && this.compassData.care ? this.compassData.care : 0} ></gi-compass>*/}
                </div>
            </div >
        );
    }
}