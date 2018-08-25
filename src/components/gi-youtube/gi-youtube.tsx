import { Component, Element, State, Prop, Method, Watch } from '@stencil/core';
import { tap } from 'rxjs/operators';

@Component({
    tag: 'gi-youtube',
    styleUrl: 'gi-youtube.css'
})
export class GiYoutube {

    @Element()
    el: HTMLElement;

    @Prop() src: string;

    @Prop() initialClassMode: boolean;

    @State() classMode: boolean;
    @State() video_thumbnail: string = "";

    componentDidLoad() {
        this.classMode = this.initialClassMode;
        this.classModeChanged();
    }

    @Watch('classMode')
    classModeChanged() {
        if (this.classMode) {
            var youtube_video_id = this.src.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/).pop();
            if (youtube_video_id.length == 11) {
                this.video_thumbnail = "//img.youtube.com/vi/" + youtube_video_id + "/0.jpg";
            }
        }
    }

    @Method()
    classRoomModeChanged(val) {
        this.classMode = val;
    }

    render() {
        return (
            <div>
                {!this.classMode ? (
                    <div class='embed-container'>
                        <iframe src={this.src} frameborder='0' allowFullScreen>
                        </iframe>
                    </div>
                ) : (<div><img src={this.video_thumbnail} /></div>)}
            </div>
        );
    }
}