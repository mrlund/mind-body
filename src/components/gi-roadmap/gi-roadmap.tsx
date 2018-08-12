import { Component, Element, State } from '@stencil/core';
import { tap } from 'rxjs/operators';


@Component({
    tag: 'gi-roadmap',
    styleUrl: 'gi-roadmap.css'
})
export class GiRoadmap {

    @Element()
    el: HTMLElement;

    dataSvc: HTMLGiDataProviderElement;

    @State()
    roadmap: Array<any>;
    
    componentDidLoad() {
        let node = this.el.parentElement;
        while (node.parentElement && !this.dataSvc){
            if (node.nodeName == "GI-DATA-PROVIDER"){
                this.dataSvc = node as HTMLGiDataProviderElement;
            } else {
                node = node.parentElement;
            }
        }
        let data$ = this.dataSvc.getData("roadmap").pipe(
            tap(val => this.roadmap = val)
        );
        data$.subscribe();
    }



    render() {
        return (
            <ul class={'roadmap'}>
                {this.roadmap.map(x => 
                    <li>{x.name}</li>
                )}
            </ul>
        );
    }
}