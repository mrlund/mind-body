import { Component, Element, State, Prop, Watch, Method, Event, EventEmitter } from '@stencil/core';
import { tap } from 'rxjs/operators';

@Component({
    tag: 'gi-character-phrase-img',
    styleUrl: 'gi-character-phrase-img.scss'
})
export class GiCharacterPhraseImg {

    @Element()
    el: HTMLElement;

    @Prop()
    character: string;

    componentDidLoad() {
        console.log(this.character);
    }

    imageWithPath(character){
        return `/assets/img/${character}.png`
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
                    <img class="image-animation" src={this.imageWithPath(this.character)} />
                </div>
            </div>
        )
    }
}