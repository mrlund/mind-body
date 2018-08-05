import { Component, Prop } from '@stencil/core';


@Component({
    tag: 'gi-simple-data'
})
export class GISimpleData {
    
    @Prop()
    value: string;

    render() {
        return (
            <span>{this.value}</span>
        );
    }
}