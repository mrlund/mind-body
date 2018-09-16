import { Component, OnInit, ViewEncapsulation, EventEmitter, Input, Output, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';

import * as d3 from 'd3';

interface Node {
  id: string;
  group: number;
}

interface Link {
  source: string;
  target: string;
  value: number;
}

interface Graph {
  nodes: Node[];
  links: Link[];
}
@Component({
  selector: 'gi-gww-graph',
  templateUrl: './gww-graph.component.html',
  styleUrls: ['./gww-graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GwwGraphComponent implements OnInit, OnChanges {
  @Output() nodeClick: EventEmitter<any> = new EventEmitter();
  @Input() nodes: any[];
  @Input() links: any[];
  canvas: any;
  canvas_container: any;

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if (changes && changes.links && changes.nodes) {
      this.drawGraph();
    }
  }
  ngOnInit() {
    this.drawGraph();
  }

  drawGraph() {
    d3.select("svg").selectAll("*").remove();
    // this.canvas = document.querySelector(".mySvg");
    // this.canvas_container = document.querySelector("#container");
    // this.canvas_container.style.width = "100%";
    // this.canvas.width = this.canvas_container.offsetWidth;
    // this.canvas.height = this.canvas_container.offsetWidth;
    // this.canvas.style.width = this.canvas_container.offsetWidth + "px";
    // this.canvas.style.height = this.canvas_container.offsetWidth + "px";

    console.log('D3.js version:', d3['version']);

    const svg = d3.select('svg');
    const width = +svg.attr('width');
    const height = +svg.attr('height');

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id((d: any) => d.id))
      .force('charge', d3.forceManyBody().strength(-900))
      .force('center', d3.forceCenter(width / 2, height / 2));

    //3.json('/assets/miserables.json').then((data: any) => {


    const nodes: Node[] = [];
    const links: Link[] = [];

    this.nodes.forEach((d) => {
      nodes.push(<Node>d);
    });

    this.links.forEach((d) => {
      links.push(<Link>d);
    });
    const graph: Graph = <Graph>{ nodes, links };

    const link = svg.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(graph.links)
      .enter()
      .append('line')
      .attr('stroke-width', 2)
      .attr('stroke', '#E5E5E5');

    var node = svg.selectAll(".node")
      .data(graph.nodes)
      .enter().append("g")
      .attr("class", "node");

    node.append("image")
      .attr("xlink:href", (d: any) => { return d.img; })
      .attr("x", -8)
      .attr("y", -8)
      .attr("width", 40)
      .attr("height", 40);


    node.append("text")
      .attr("dx", 0)
      .attr("dy", 45)
      .text((d: any) => { return d.name })
      .style("font-size", (d) => { return "17px"; })
      .style("cursor", "pointer");



    svg.selectAll('.node').call(d3.drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended)
    );

    node.append('title')
      .text((d: any) => d.name);

    node.on("click", (d) => { this.nodeClick.emit(d); })

    simulation
      .nodes(graph.nodes)
      .on('tick', ticked);

    simulation.force<d3.ForceLink<any, any>>('link')
      .links(graph.links);

    function ticked() {
      link
        .attr('x1', (d: any) => { return d.source.x; })
        .attr('y1', (d: any) => { return d.source.y; })
        .attr('x2', (d: any) => { return d.target.x; })
        .attr('y2', (d: any) => { return d.target.y; });
      node.attr("transform", (d: any) => { return "translate(" + d.x + "," + d.y + ")"; });
      // node.attr("transform", (d: any) => { return "translate(100,100)"; });
      // node
      //   .attr('cx', function (d: any) { return d.x; })
      //   .attr('cy', function (d: any) { return d.y; });

      // text
      //   .attr('dx', function (d: any) { return d.x; })
      //   .attr('dy', function (d: any) { return d.y; });
    }
    // }).catch((err) => {
    //   if (err) { throw new Error('Bad data file!'); }
    // });

    function dragstarted(d) {
      if (!d3.event.active) { simulation.alphaTarget(0.3).restart(); }
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragended(d) {
      if (!d3.event.active) { simulation.alphaTarget(0); }
      d.fx = null;
      d.fy = null;
    }
  }

}
