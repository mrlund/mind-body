import { Component, Element, State, Prop, Watch, Method, Event, EventEmitter } from '@stencil/core';

@Component({
    tag: 'gi-assignment',
    styleUrl: 'gi-assignment.scss'
})
export class GiAssignment {

    @Element()
    el: HTMLElement;

    render() {
        return (
            <div class="assignment">
                <div class="assignment-header">
                    <slot name="header" />
                </div>
                <div class="assignment-body">
                    <slot name="body" />
                </div>
            </div >
        )
    }
}

