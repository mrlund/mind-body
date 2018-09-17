import { Component, Element, State, Prop, Watch, Method, Event, EventEmitter, Listen } from '@stencil/core';

@Component({
    tag: 'gi-compass',
    styleUrl: 'gi-compass.scss'
})
export class GiCompass {

    @Element()
    el: HTMLElement;

    @Prop({ reflectToAttr: true })
    resiliance: number;
    @Prop({ reflectToAttr: true })
    care: number;

    @Prop({ reflectToAttr: true })
    org: number;
    @Prop({ reflectToAttr: true })
    school: number;

    @Prop({ reflectToAttr: true })
    relationship: number;
    @Prop({ reflectToAttr: true })
    emotions: number;

    @Prop({ reflectToAttr: true })
    spirituality: number;
    @Prop({ reflectToAttr: true })
    rest: number;

    @State()
    canvas: any;

    @State()
    canvase_container: any;

    componentDidLoad() {
        this.drawOnCompass();
        window.addEventListener('resize', () => this.drawOnCompass());

        //context.beginPath();
        // context.fillStyle = "rgba(96, 187,70, 0.5)";
        // // Go to center of the Chart
        //context.moveTo(centerX, centerY);
        // // Draw an Arc
        // // arc(centerX, centerY, radius, angleStart, angleEnd)
        // var radius = this.getRadiusFromSection(this.resilence);
        // context.arc(centerX, centerY, radius, 0, Math.PI / 4);

        // // Draw a line to close the pie slice
        // //context.lineTo(centerX, centerY);

        // // Print the path
        // //context.stroke();
        // context.fill();

    }

    // @Listen("window:resize")
    // resize() {
    //     this.drawOnCompass()
    // }
    @Method()
    drawOnCompass() {

        this.canvas = this.el.querySelector(".myCanvas");
        this.canvase_container = this.el.querySelector("#container");
        this.canvase_container.style.width = "100%";
        this.canvas.width = this.canvase_container.offsetWidth;
        this.canvas.height = this.canvase_container.offsetWidth;
        this.canvas.style.width = this.canvase_container.offsetWidth + "px";
        this.canvas.style.height = this.canvase_container.offsetWidth + "px";
        //this.canvase_container.style.height = this.canvas.offsetWidth + "px";


        var context = this.canvas.getContext('2d');
        var centerX = this.canvas.width / 2;
        var centerY = this.canvas.height / 2;

        //DRAW CARE FOR BODY
        context.beginPath();
        context.moveTo(centerX, centerY);
        context.fillStyle = "rgba(96, 187,70, 0.5)";
        var radius = this.getRadiusFromSection(this.resiliance);
        context.arc(centerX, centerY, radius, 0, Math.PI / 4);
        context.fill();

        //DRAW CARE FOR BODY
        context.beginPath();
        context.moveTo(centerX, centerY);
        context.fillStyle = "rgba(96, 187,70, 0.6)";
        var radius = this.getRadiusFromSection(this.care);
        context.arc(centerX, centerY, radius, Math.PI / 4, Math.PI / 2);
        context.fill();

        //DRAW ORGANIZATION
        context.beginPath();
        context.moveTo(centerX, centerY);
        context.fillStyle = "rgba(44, 160,217, 0.5)";
        var radius = this.getRadiusFromSection(this.org);
        context.arc(centerX, centerY, radius, Math.PI / 2, Math.PI * 0.75);
        context.fill();

        //DRAW SCHOOL AND WORK
        context.beginPath();
        context.moveTo(centerX, centerY);
        context.fillStyle = "rgba(44, 160,217, 0.6)";
        var radius = this.getRadiusFromSection(this.school);
        context.arc(centerX, centerY, radius, Math.PI * 0.75, Math.PI);
        context.fill();


        //DRAW RELATIONSHIP
        context.beginPath();
        context.moveTo(centerX, centerY);
        context.fillStyle = "rgba(220, 24,98, 0.5)";
        var radius = this.getRadiusFromSection(this.relationship);
        context.arc(centerX, centerY, radius, Math.PI, Math.PI * 1.25);
        context.fill();

        //DRAW EMOTIONS
        context.beginPath();
        context.moveTo(centerX, centerY);
        context.fillStyle = "rgba(220, 24,98, 0.6)";
        var radius = this.getRadiusFromSection(this.emotions);
        context.arc(centerX, centerY, radius, Math.PI * 1.25, Math.PI * 1.5);
        context.fill();



        //DRAW SPIRITUALITY
        context.beginPath();
        context.moveTo(centerX, centerY);
        context.fillStyle = "rgba(224,117,33, 0.5)";
        var radius = this.getRadiusFromSection(this.spirituality);
        context.arc(centerX, centerY, radius, Math.PI * 1.5, Math.PI * 1.75);
        context.fill();

        //DRAW REST AND PLAY
        context.beginPath();
        context.moveTo(centerX, centerY);
        context.fillStyle = "rgba(224,117,33, 0.6)";
        var radius = this.getRadiusFromSection(this.rest);
        context.arc(centerX, centerY, radius, Math.PI * 1.75, Math.PI * 2);
        context.fill();
    }
    getRadiusFromSection(section) {
        var defaultRadius = 0.09 * this.canvas.width;
        var sectionRadius = 0.028 * this.canvas.width;
        if (section == 0) {
            return 0;
        }
        else if (section == 1) {
            return defaultRadius;
        }
        else {
            if (section > 5) {
                return defaultRadius + (section - 1) * sectionRadius + 1;
            }
            return defaultRadius + (section - 1) * sectionRadius;
        }
    }
    render() {
        return (
            <div id="container">
                <img id="compassImage" class="src-image" src="/assets/img/compass.jpg" />
                <canvas class="myCanvas" >
                    Your browser does not support the HTML5 canvas tag.</canvas>
                <img id="compassOverImage" src="/assets/img/compass-over.png" />
            </div>
        )
    }
}