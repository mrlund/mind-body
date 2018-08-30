import { Component, Element, State, Prop, Watch, Method, Event, EventEmitter } from '@stencil/core';
import { tap } from 'rxjs/operators';

@Component({
    tag: 'gi-mood-image',
    styleUrl: 'gi-mood-image.css'
})
export class GiMoodImage {

    @Element()
    el: HTMLElement;

    @Prop()
    src: string;

    componentDidLoad() {
        console.log(this.src);
    }
    render() {
        return (
            <div><img class="mood-image" src={this.src} /></div>
        )
    }
}