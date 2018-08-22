import { Component, Prop, State, Method } from '@stencil/core';
import { map, tap, mergeMap, share, switchMap, filter } from 'rxjs/operators';
import { Observable, from, of } from 'rxjs/';


@Component({
    tag: 'gi-data-provider',
    styleUrl: 'gi-data-provider.css'
})
export class GIDataProvider {
    @Prop() pageContentUrl: string;

    @Prop() baseServerUrl: string;


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
    loadPageContent() {
        console.log("fetchingcontent", this.pageContentUrl + ".html");
        fetch(this.pageContentUrl + ".html", { method: 'get' })
            .then((response) => {
                response.text().then((text) => {
                    if (text && text.length) {
                        text = text.replace(/BASE_URL/g, this.baseServerUrl);
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
        console.log("Saving ", data);
        let token = localStorage.getItem("token");
        if (token) {
            let postData = {
                page: this.pageContentUrl,
                data: data
            };
            return from(fetch(this.baseServerUrl, {
                method: 'POST',
                body: JSON.stringify(postData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })).pipe(
                switchMap(x => x.json())
            );
        } else {
            console.log("No token, cant save");
        }
    }

    render() {
        return (
            <div innerHTML={this.innerHtmlData}></div>
        );
    }
}