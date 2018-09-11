import { Component, Element, State, Prop, Watch, Method, Event, EventEmitter } from '@stencil/core';
import { tap } from 'rxjs/operators';

@Component({
    tag: 'gi-character-pharse-img',
    styleUrl: 'gi-character-pharse-img.scss'
})
export class GiCharacterPharseImg {

    @Element()
    el: HTMLElement;

    @Prop()
    src: string;

    componentDidLoad() {
        console.log(this.src);
    }
    render() {
        return (
            <div class="character-phrase-block">
                <div class="character-text-block">
                    <div class="triangle-border triangle-border left">
                        <slot />
                    </div>
                </div>
                <div class="character-image-block">
                    <img class="image-animation" src="/assets/img/zynab.png" />
                </div>
            </div>
        )
    }
}