import { Component, Element, State, Prop, Watch, Method, Event, EventEmitter } from '@stencil/core';
import { tap } from 'rxjs/operators';

@Component({
    tag: 'gi-intro',
    styleUrl: 'gi-intro.scss'
})
export class GiMood {

    @Element()
    el: HTMLElement;

    @State()
    description: string
    componentDidLoad() {

    }
    introOnMouseOver(description: any, event: any) {
        this.description = description;
        console.log(event);
        event.target.style.opacity = 1;
    }

    render() {
        return (
            <div>
                <div class="people">
                    <div class="character-image zynab" onMouseOver={(evt) => this.introOnMouseOver("<strong>I’m ZINAB or Z.</strong> My family’s from Nigeria, and we live in the Melrose section of the South Bronx. I’m all about racial justice, and watch… I’m going to be first Muslim mayor of New York City. Believe that!", evt)}>
                        <img src="/assets/img/zynab.png" />
                    </div>
                    <div class="character-image kimberley" onMouseOver={(evt) => this.introOnMouseOver("</strong>Hey, everyone, this KIMBERLY, and I’m from Brooklyn.</strong> My dream is to become venture capitalist so I can fund businesses and causes led by other Black women. I love business reality TV shows like Shark Tank and Undercover Boss.", evt)}>
                        <img src="/assets/img/kimberley.png" />
                    </div>
                    <div class="character-image yuna" onMouseOver={(evt) => this.introOnMouseOver("<strong>My name is YUNA,</strong> I’m from Murray Hill Queens. Second-generation Korean American. I love softball and statistics so right now my dream job would be in sabermetrics. You know, basically a data analyst in baseball.", evt)}>
                        <img src="/assets/img/yuna.png" />
                    </div>
                    <div class="character-image valeria" onMouseOver={(evt) => this.introOnMouseOver("<strong>I’m VALERIA but most of my friends call me Val.</strong> First-generation Dominican from Washington Heights. I could watch MSNBC and CNN all day. In fact, one day I’m going to have my own political talk show like my crushes Rachel Maddow and Robin Roberts.", evt)}>
                        <img src="/assets/img/valeria.png" />
                    </div>
                </div>
                <div class="people-description">
                    {this.description ?
                        <div class="character-intro" innerHTML={this.description}>
                        </div>
                        : ""
                    }

                </div>
            </div >
        )
    }
}