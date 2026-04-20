import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import useResizeObserver from '../../Components/useResizeObserver';

/**
 * Component that renders a StackedBarChart
 */

function Histogram({ data }) {
  const svgRef = useRef();
  //   const yAxisRef = useRef();
  const wrapperRef = useRef();

  const dimensions = useResizeObserver(wrapperRef);

  // will be called initially and on every data change
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const height = 100;
    const width = 100;

    // var dLength = data.length - 1;

    var min = data[0][0];

    var dom = data[data.length - 1][1];

    var x = d3
      .scaleLinear()
      .domain([min, dom]) // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
      .range([0, width]);
    svg
      .append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x).ticks(data.length - 1));

    var y = d3.scaleLinear().range([height, 0]);
    y.domain([
      0,
      d3.max(data, function (d) {
        return d[2];
      }),
    ]); // d3.hist has to be called before the Y axis obviously
    svg.append('g').call(d3.axisLeft(y));

    svg
      .append('g')
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      // .attr('x', 1)
      .attr('transform', function (d) {
        return 'translate(' + x(d[0]) + ',' + y(d[2]) + ')';
      })
      .attr('width', function (d) {
        return x(d[1]) - x(d[0]) - 1;
      })
      .attr('height', function (d) {
        return height - y(d[2]);
      })
      .style('fill', '#69b3a2');

    // stacks / layers
    // Create the stack and group it so that the smallest values are on the bottom
  }, [data, dimensions, svgRef]);

  return (
    <React.Fragment>
      <div
        ref={wrapperRef}
        style={{ marginBottom: '0rem', width: '100%', height: '100%' }}
      >
        <div></div>
        <div>
          <svg
            ref={svgRef}
            style={{ marginBottom: '0rem', width: '100%', height: '100%' }}
          ></svg>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Histogram;
