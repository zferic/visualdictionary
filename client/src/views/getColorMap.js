import * as d3 from 'd3';

export default function getColormap(
  colorMaps,
  selectedColorMap,
  property,
  propertyList
) {
  if (
    selectedColorMap === 'Default' ||
    selectedColorMap === undefined ||
    property === 'Default' ||
    property === undefined
  ) {
    return undefined;
  }

  const selectedCM = colorMaps.find(({ name }) => name === selectedColorMap);
  const selectedProperty = propertyList.find(({ name }) => name === property);

  if (
    selectedProperty.type === 'categorical' ||
    selectedProperty.type === 'discrete'
  ) {
    if (selectedCM.type === 'categorical') {
      return d3.scaleOrdinal(d3['scheme' + selectedCM.name]);
    } else if (selectedCM.type === 'sequential') {
      return d3.scaleOrdinal(d3['scheme' + selectedCM.name][9]);
    } else if (selectedCM.type === 'diverging') {
      return d3.scaleOrdinal(d3['scheme' + selectedCM.name][11]);
    } else {
      return undefined;
    }
  } else if (selectedProperty.type === 'continuous') {
    if (selectedCM.type === 'categorical') {
      return d3.scaleOrdinal(d3['scheme' + selectedCM.name]);
    } else if (selectedCM.type === 'sequential') {
      return d3.scaleSequential(d3['interpolate' + selectedCM.name]);
    } else if (selectedCM.type === 'diverging') {
      return d3.scaleSequential(d3['interpolate' + selectedCM.name]);
    } else {
      return undefined;
    }
  }
}
