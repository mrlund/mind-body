import { Component, Prop, State, Method } from '@stencil/core';
import { map, tap, mergeMap, share, switchMap, filter } from 'rxjs/operators';
import { Observable, from, of } from 'rxjs';
@Component({
    tag: 'gi-data-provider',
    styleUrl: 'gi-data-provider.css'
})
export class GIDataProvider {
    @Prop() pageContentUrl: string;

    @Prop() baseContentUrl: string;

    @Prop() baseServerUrl: string;

    @Prop() isClassroomModeOn: string;

    @State()
    private data;
    @State()
    private innerHtmlData;

    @State()
    private idInfo;

    @Method()
    getIdInfo(obj) {
        console.log(obj);
        this.idInfo = obj;
    }

    data$: Observable<any>;

    constructor() {

    }
    componentDidLoad() {
        this.loadPageContent();
    }
    loadData() {
        this.data$ = from(fetch(this.pageContentUrl + ".json")).pipe(
            switchMap(r => r.json()),
            share()
        );
    }

    // @Method()
    // classRoomModeChanged(val) {
    //     console.log('provider', val);
    //     this.innerHtmlData = this.innerHtmlData.replace(/class-mode="([^"]+)"/g, 'class-mode="' + val + '"');
    //     console.log(this.innerHtmlData)
    // }

    loadPageContent() {
        fetch(this.pageContentUrl + ".html", { method: 'get' })
            .then((response) => {
                response.text().then((text) => {
                    if (text && text.length) {
                        text = text.replace(/BASE_URL/g, this.baseContentUrl);
                        text = text.replace(/INITIAL_CLASSROOM_MODE/g, this.isClassroomModeOn);
                        this.innerHtmlData = text;
                    }
                })
            }).catch((err) => {
                this.innerHtmlData = "<p>Error while loading video</p>";
                console.log(err);
            });
    }

    @Method()
    getData(key: string): Observable<any> {
        //console.log("requested ", key);
        if (this.data && this.data[key]) {
            // console.log("returned ", this.data[key]);
            return from([this.data[key]]);
        } else if (!this.data) {
            // console.log("not found, waiting");
            if (!this.data$) {
                this.loadData();
            }
            return of(0).pipe(
                mergeMap(() => this.data$),
                tap(x => console.log("returned ", x[key])),
                tap(x => this.data = x),
                map(x => x[key]),
            );
        }
    }

    @Method()
    saveData(data: any, api: string) {
        let token = this.getToken();
        console.log(token);
        console.log(data);
        if (token) {
            let postData = {
                ResponseType: data.responseType,
                ResponseId: 1,
                ResponseName: "demo",
                CourseClassId: 1,
                Question: data.question,
                Response: data.answer,
                ExtraResponseData: "",
                CourseId: this.idInfo.CourseId,
                CourseModuleId: this.idInfo.CourseId,
                SessionId: this.idInfo.CourseId,
                PageId: this.idInfo.CourseId
            };
            return from(fetch(this.baseServerUrl + api, {
                method: 'POST',
                body: JSON.stringify(postData),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })).pipe(
                switchMap(x => { console.log(x); return x.json(); })
            );
        } else {
            console.log("No token, cant save");
        }
    }

    getToken(): String {
        let tokenStr = window.localStorage["currentUser"];
        if (tokenStr) {
            let token = JSON.parse(tokenStr);
            token = JSON.parse(token);
            if (new Date(token["expiration"]).getTime() > new Date().getTime()) {
                return token.token;
            }
        }
        return null;
    }
    render() {
        return (
            <div innerHTML={this.innerHtmlData}></div>
        );
    }
}