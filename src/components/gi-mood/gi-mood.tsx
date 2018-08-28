import { Component, Element, State, Prop, Watch, Method, Event, EventEmitter } from '@stencil/core';
import { tap } from 'rxjs/operators';

@Component({
    tag: 'gi-mood',
    styleUrl: 'gi-mood.css'
})
export class GiMood {

    @Element()
    el: HTMLElement;

    @Prop()
    level: number;

    @Event() moodChange!: EventEmitter<string>;
    @State()
    moodImageUrl: string;

    @State()
    mood: string;

    componentDidLoad() {
        console.log(this.level);
        this.getImageForLevel();
    }

    @Watch('level')
    protected levelChanged() {
        this.getImageForLevel();
        this.moodChange.emit(this.mood);
    }

    getImageForLevel() {
        console.log(this.level);
        if (this.level == 1) {
            this.moodImageUrl = "/assets/img/mood/angry.png";
            this.mood = "Amused";
        }
        else if (this.level == 2) {
            this.moodImageUrl = "/assets/img/mood/confused.png";
            this.mood = "Calm";
        }
        else if (this.level == 3) {
            this.moodImageUrl = "/assets/img/mood/crying-1.png";
            this.mood = "Content";

        }
        else if (this.level == 4) {
            this.moodImageUrl = "/assets/img/mood/embarrassed.png";
            this.mood = "Cheerful";
        }
        else if (this.level == 5) {
            this.moodImageUrl = "/assets/img/mood/emoticons.png";
            this.mood = "Chill";
        }
        else if (this.level == 6) {
            this.moodImageUrl = "/assets/img/mood/happy.png";
            this.mood = "Excited";
        }
        else if (this.level == 7) {
            this.moodImageUrl = "/assets/img/mood/secret.png";
            this.mood = "Happy";
        }
        else if (this.level == 8) {
            this.moodImageUrl = "/assets/img/mood/surprised.png";
            this.mood = "Proud";
        }
        else if (this.level == 9) {
            this.moodImageUrl = "/assets/img/mood/smart.png";
            this.mood = "Relaxed";
        }
        else {
            this.moodImageUrl = "/assets/img/mood/mad.png";
            this.mood = "Relieved";
        }
    }

    render() {
        return (
            <div><img class="mood-image" src={this.moodImageUrl} /><br /><small>{this.mood}</small></div>
        )
    }
}