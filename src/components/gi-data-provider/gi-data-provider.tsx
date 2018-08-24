import { Component, Prop, State, Method } from '@stencil/core';
import { map, tap, mergeMap, share, switchMap, filter } from 'rxjs/operators';
import { Observable, from, of } from 'rxjs/';


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
        console.log("fetchingcontent", this.pageContentUrl + ".html");
        fetch(this.pageContentUrl + ".html", { method: 'get' })
            .then((response) => {
                response.text().then((text) => {
                    if (text && text.length) {
                        text = text.replace(/BASE_URL/g, this.baseContentUrl);
                        text = text.replace(/CLASSROOM_MODE/g, this.isClassroomModeOn);
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
    saveData(data: any) {
        let token = this.getToken();
        if (token) {
            let postData = {
                ResponseType: 1,
                ResponseId: 1,
                ResponseName: "demo",
                CourseClassId: 1,
                Question: data.question,
                Response: data.answer,
                ExtraResponseData: "",
                CourseId: 1,
                CourseModuleId: 1,
                SessionId: 1,
                PageId: 1
            };
            return from(fetch(this.baseServerUrl + "/api/student/quiz-response", {
                method: 'PUT',
                body: JSON.stringify(postData),
                headers: {
                    'Content-Type': 'application/json'
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