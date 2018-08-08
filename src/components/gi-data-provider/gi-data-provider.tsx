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

    data$: Observable<any>;

    constructor() {
    }
    componentDidLoad() {
    }
    loadData(){
        this.data$ = from(fetch(this.pageContentUrl + ".json")).pipe(
            switchMap(r => r.json()),
            share()
        );
    }

    @Method()
    getData(key: string): Observable<any> {
        console.log("requested ", key);
        if (this.data && this.data[key]) {
            console.log("returned ", this.data[key]);
            return from([this.data[key]]);
        } else if (!this.data) {
            console.log("not found, waiting");
            if (!this.data$){
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
    saveData(data: any){
        let postData = {
            page: this.pageContentUrl,
            data: data
        };
        return from(fetch(this.baseServerUrl, {
            method: 'POST', 
            body: JSON.stringify(postData),
            headers:{
              'Content-Type': 'application/json'
            }
        })).pipe(
            switchMap(x => x.json())
        );
    }

    render() {
        return (
            <slot />
        );
    }
}