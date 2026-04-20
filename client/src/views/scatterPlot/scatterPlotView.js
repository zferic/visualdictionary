import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import useResizeObserver from '../../Components/useResizeObserver';
import './style.css';

const setColor = (d, selected, colorScale, defaultColor) => {
  if (selected && colorScale && selected !== undefined) {
    return colorScale(selected);
  } else {
    return defaultColor;
  }
};

const getScale = (data, prop) => {
  return d3.scaleLinear().domain(d3.extent(data, (d) => d[prop]));
};
const margin = { top: 20, right: 30, bottom: 30, left: 30 };

//Graph view assumes continuous values are normalized between 0 and 1
function ScatterPlotView({
  data, //{Data:{nodes:[], links:[]}} should contain a list of nodes and links
  pointColor, //{string} property
  pointColorMap, //{d3.colormap} contains node color map
}) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    if (!data) return;
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();
    // if(!properties) return;

    //Grab the svg and set its viewbox
    const svg = d3.select(svgRef.current);
    svg.attr('viewBox', [0, 0, width, height]);
    const g = svg.select('g');
    //Data rename
    const x = getScale(data, 0).range([margin.left, width - margin.right]);
    const y = getScale(data, 1).range([height - margin.bottom, margin.top]);

    const xAxis = d3.axisBottom(x);
    svg
      .select('.x-axis')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(xAxis);

    const yAxis = d3.axisLeft(y);
    svg
      .select('.y-axis')
      .attr('transform', `translate(${margin.left},0)`)
      .call(yAxis);

    g.selectAll('.point')
      .data(data)
      .join('circle')
      .attr('class', 'point')
      .attr('stroke', '#000')
      .attr('stroke-opacity', 0.2)
      .attr('cx', (d) => x(d[0]))
      .attr('cy', (d) => y(d[1]))
      .attr('fill', (d, i, nodes) => {
        return setColor(
          d,
          pointColor && pointColor[i],
          pointColorMap,
          '#0868ac'
        );
      })
      .attr('r', 2.5);
  }, [data, dimensions, pointColor, pointColorMap]);

  return (
    <div
      ref={wrapperRef}
      style={{ marginBottom: '2rem', width: '100%', height: '100%' }}
    >
      <svg ref={svgRef}>
        <g />
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  );
}

export default ScatterPlotView;
