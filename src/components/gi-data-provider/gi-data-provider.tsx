import { Component, Prop, State, Method, Event, EventEmitter } from '@stencil/core';
import { map, tap, mergeMap, share, switchMap, filter } from 'rxjs/operators';
import { Observable, from, of } from 'rxjs';


@Component({
    tag: 'gi-data-provider',
    styleUrl: 'gi-data-provider.scss'
})
export class GIDataProvider {
    @Prop() pageContentUrl: string;

    @Prop() baseContentUrl: string;

    @Prop() baseServerUrl: string;

    @Prop() isClassroomModeOn: string;

    @Prop() signalRService: any;

    @State()
    private data;
    @State()
    private innerHtmlData;

    @State()
    private idInfo;

    @Method()
    getIdInfo(obj) {
        this.idInfo = obj;
    }
    @Event() valueChanged: EventEmitter;
    getPageIdInfoHandler() {
        this.valueChanged.emit();
    }
    data$: Observable<any>;

    constructor() {
    }
    componentDidLoad() {
        this.loadPageContent();
        this.getPageIdInfoHandler();
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
            });
    }

    @Method()
    callSignalR(data: any, hub: string) {
        console.log("Calling " + hub + " with  ", data);
        this.signalRService.callSignalR(hub, JSON.stringify(data));
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
        if (token) {
            // let postData = {
            //     ResponseType: data.responseType,
            //     ResponseId: 1,
            //     ResponseName: "demo",
            //     CourseClassId: 1,
            //     Question: data.question,
            //     Response: data.answer,
            //     ExtraResponseData: "",
            //     CourseId: this.idInfo.CourseId,
            //     CourseModuleId: this.idInfo.CourseId,
            //     SessionId: this.idInfo.CourseId,
            //     PageId: this.idInfo.CourseId
            // };
            data.CourseId = this.idInfo.CourseId;
            data.CourseModuleId = this.idInfo.CourseId;
            data.SessionId = this.idInfo.CourseId;
            data.PageId = this.idInfo.CourseId;
            return from(fetch(this.baseServerUrl + api, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })).pipe(
                switchMap(x => { return x.json(); })
            );
        } else {
            console.log("No token, cant save");
        }
    }
    @Method()
    getServerData(api: string) {
        let token = this.getToken();
        if (token) {
            return from(fetch(this.baseServerUrl + api, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })).pipe(
                switchMap(x => {
                    return x.text().then(function (text) {
                        return text ? JSON.parse(text) : {}
                    })
                })
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
            console.log(token);
            if (new Date(token["Expiration"]).getTime() > new Date().getTime()) {
                return token.Token;
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