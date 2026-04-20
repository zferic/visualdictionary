export default function genLineChart(
  data,
  xProperty,
  yProperty,
  colorProperty
) {
  if (data === null || xProperty === 'Default' || yProperty === 'Default') {
    return [undefined, undefined];
  }

  const xy = data.nodes.map((node) => {
    return [node[xProperty], node[yProperty]];
  });

  if (colorProperty === 'Default') {
    return [xy, undefined];
  }
  const color = data.nodes.map((node) => {
    return node[colorProperty];
  });
  return [xy, color];
}
