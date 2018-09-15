import { Component, OnInit, ViewEncapsulation } from '@angular/core';

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
  selector: 'gi-demo',
  templateUrl: './demo.page.html',
  styleUrls: ['./demo.page.scss'],
})
export class DemoPage implements OnInit {
  ngOnInit() {
    console.log('D3.js version:', d3['version']);

    const svg = d3.select('svg');
    const width = +svg.attr('width');
    const height = +svg.attr('height');

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id((d: any) => d.id))
      .force('charge', d3.forceManyBody().strength(-1000))
      .force('center', d3.forceCenter(width / 2, height / 2));

    d3.json('assets/miserables.json').then((data: any) => {


      const nodes: Node[] = [];
      const links: Link[] = [];

      data.nodes.forEach((d) => {
        nodes.push(<Node>d);
      });

      data.links.forEach((d) => {
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


      const node = svg.append('g')
        .attr('class', 'nodes')
        .selectAll('circle')
        .data(graph.nodes)
        .enter()
        .append('circle')
        .attr('r', 15)
        .attr('fill', (d: any) => color(d.group));

      // node.append("image")
      //   .attr("xlink:href", "/assets/img/logo-primary.png")
      //   .attr("x", -8)
      //   .attr("y", -8)
      //   .attr("width", 16)
      //   .attr("height", 16);



      svg.selectAll('circle').call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended)
      );

      node.append('title')
        .text((d) => d.id);

      node.on("click", function (d) { console.log(d) })

      simulation
        .nodes(graph.nodes)
        .on('tick', ticked);

      simulation.force<d3.ForceLink<any, any>>('link')
        .links(graph.links);

      function ticked() {
        link
          .attr('x1', function (d: any) { return d.source.x; })
          .attr('y1', function (d: any) { return d.source.y; })
          .attr('x2', function (d: any) { return d.target.x; })
          .attr('y2', function (d: any) { return d.target.y; });

        node
          .attr('cx', function (d: any) { return d.x; })
          .attr('cy', function (d: any) { return d.y; });
      }
    }).catch((err) => {
      if (err) { throw new Error('Bad data file!'); }
    });

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
