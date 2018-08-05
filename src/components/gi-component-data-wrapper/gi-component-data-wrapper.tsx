import { Component, Prop, Element } from '@stencil/core';
import { tap } from 'rxjs/operators';

@Component({
    tag: 'gi-component-data-wrapper',
    styleUrl: 'gi-component-data-wrapper.css'
})
export class GIComponentDataWrapper {
    

    //Usage:       <gi-component-data-wrapper prop-names="awesome,my-greeting" prop-values="awesome,greeting">
    //                  <unaware-child-component awesome="" my-greeting=""></unaware-child>
     //             </gi-component-data-wrapper>


    @Prop()
    propNames: string; 

    @Prop()
    propValues: string; 

    @Element()
    el: HTMLElement;

    dataSvc: HTMLGiDataProviderElement;

    componentDidLoad() {
        let node = this.el.parentElement;
        while (node.parentElement && !this.dataSvc){
            if (node.nodeName == "GI-DATA-PROVIDER"){
                this.dataSvc = node as HTMLGiDataProviderElement;
            } else {
                node = node.parentElement;
            }
        }
        let propNames = this.propNames.split(',');
        let propValues = this.propValues.split(',');

        propValues.forEach((p,i)=> this.loadData(p, propNames[i]));
    }

    loadData(propValue, propName){
        let data$ = this.dataSvc.getData(propValue).pipe(
            tap(val => this.setPropValueOnChildren(propName, val))
        )
        data$.subscribe();
    }
    setPropValueOnChildren(name, value){
        for (var i = 0; i < this.el.children.length; i++){
            if (this.el.children[i].hasAttribute(name)){
                this.el.children[i].setAttribute(name, value);
            }
        }
    }
    render() {
        return (
            <slot />
        );
    }

}