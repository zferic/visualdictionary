import React, { useEffect, useRef } from 'react';
import {
  select,
  scaleBand,
  axisBottom,
  stack,
  max,
  scaleLinear,
  axisLeft,
  stackOrderAscending,
} from 'd3';
import useResizeObserver from '../../Components/useResizeObserver';

/**
 * Component that renders a StackedBarChart
 */

function StackedBarChart({ data, keys, colors }) {
  const svgRef = useRef();
  //   const yAxisRef = useRef();
  const wrapperRef = useRef();

  const dimensions = useResizeObserver(wrapperRef);

  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef.current);
    // const yAxisSvg = select(yAxisRef.current);
    // const { width, height } =
    //   dimensions || wrapperRef.current.getBoundingClientRect();

    const height = 70;
    // stacks / layers
    // Create the stack and group it so that the smallest values are on the bottom
    const stackGenerator = stack().keys(keys);
    const layers = stackGenerator(data);

    // This is our min/max values
    const extent = [
      0,
      max(layers, (layer) => max(layer, (sequence) => sequence[1])),
    ];

    // scales
    const xScale = scaleBand()
      .domain(data.map((d) => d.key))
      .range([0, 20]);

    const yScale = scaleLinear().domain(extent).range([height, 0]);

    // rendering
    svg
      .attr('width', data.length * 20)
      .attr('height', height)
      .selectAll('.layer')
      .data(layers)
      .join('g')
      .attr('class', 'layer')
      .attr('fill', (layer) => colors[layer.key])
      .selectAll('rect')
      .data((layer) => layer)
      .join('rect')
      .attr('class', 'data-bar')
      .attr('x', (sequence) => xScale(sequence.data.key))
      .attr('width', xScale.bandwidth())
      .attr('y', (sequence) => yScale(sequence[1]))
      .attr('height', (sequence) => {
        if (!isNaN(sequence[0]) && !isNaN(sequence[1])) {
          return yScale(sequence[0]) - yScale(sequence[1]);
        } else {
          return 0;
        }
      });

    // axes
    // const xAxis = axisBottom(xScale);
    // svg
    //   .select('.x-axis')
    //   .attr('transform', `translate(0, ${height})`)
    //   .call(xAxis)
    //   .selectAll('text')
    //   .style('text-anchor', 'end')
    //   .attr('dx', '-.8em')
    //   .attr('dy', '.15em')
    //   .attr('transform', 'rotate(-65)');

    // const yAxis = axisLeft(yScale);
    // yAxisSvg.select('.y-axis').attr('height', height).call(yAxis);
  }, [colors, data, dimensions, keys]);

  return (
    <React.Fragment>
      <div
        ref={wrapperRef}
        // style={{ marginBottom: '0rem', width: '100%', height: '100%' }}
      >
        <div></div>
        <div>
          <svg
            ref={svgRef}
            // style={{ marginBottom: '0rem', width: '100%', height: '100%' }}
          ></svg>
        </div>
      </div>
    </React.Fragment>
  );
}

export default StackedBarChart;
