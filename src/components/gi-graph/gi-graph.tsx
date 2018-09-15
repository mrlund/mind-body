import { Component, Element, State, Prop, Watch, Method, Event, EventEmitter } from '@stencil/core';

@Component({
    tag: 'gi-graph',
    styleUrl: 'gi-graph.scss'
})
export class GiGraph {

    @Element()
    el: HTMLElement;

    componentDidLoad() {
    }

    render() {
        return (
            <div>

            </div >
        )
    }
}