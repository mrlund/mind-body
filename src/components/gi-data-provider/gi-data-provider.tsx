import { Component, Prop, State, Method } from '@stencil/core';
import { map, tap, mergeMap, share, switchMap } from 'rxjs/operators';
import { Observable, from, of } from 'rxjs/';


@Component({
    tag: 'gi-data-provider',
    styleUrl: 'gi-data-provider.css'
})
export class GIDataProvider {
    @Prop() pageContentUrl: string;
  
    @State()
    private data;
  
    data$ : Observable<any>;
  
    constructor(){
    }
    componentWillLoad() {
        this.data$ = from(fetch(this.pageContentUrl + "/data.json")).pipe(
            switchMap(r=> r.json()),
            share()
          );
    }
  
    @Method()
    getData(key: string) : Observable<any>{
      console.log("requested ", key);
      if(this.data && this.data[key]){
        console.log("returned ", this.data[key]);
        return from([this.data[key]]);
      } else if (!this.data){
        console.log("not found, waiting");
        
        return of(0).pipe(
          mergeMap(() => this.data$),
          tap(x=> console.log("returned ", x)),
          tap(x=> this.data = x),
          map(x=>x[key]),
        );
      }
    }
  
    render() {
        return (
            <slot />
        );
    }
}