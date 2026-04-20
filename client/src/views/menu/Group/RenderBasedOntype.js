import NumberBox from '../../../Components/Menu/NumberBox';
import ComboBox from '../../../Components/Menu/ComboBox';
import ColorPicker from '../../../Components/Menu/ColorPicker';
import CheckBox from '../../../Components/Menu/CheckBox';

const RenderBasedOnType = ({
  label,
  option,
  meta,
  colormaps,
  handleUpdate,
}) => {
  const getProperties = (meta, property) => {
    let properties = ['Default'];

    for (let variable of meta) {
      if (variable.group === property.dataGroup) {
        if (property.dataType.includes(variable.type)) {
          properties.push(variable.name);
        }
      }
    }
    return properties;
  };
  const filterColorMap = (colormaps, types, meta, name) => {
    if (name === 'Default') {
      return colormaps.filter((colormap) => {
        if (
          colormap.type === 'categorical' &&
          (types.includes('discrete') || types.includes('categorical'))
        ) {
          return true;
        } else if (
          colormap.type === 'diverging' &&
          types.includes('continuous')
        ) {
          return true;
        } else if (
          colormap.type === 'sequential' &&
          types.includes('continuous')
        ) {
          return true;
        } else if (colormap.name === 'Default') {
          return true;
        }
        return false;
      });
    } else {
      const index = meta.findIndex((x) => x.name === name);
      const property = meta[index];
      return colormaps.filter((colormap) => {
        if (
          colormap.type === 'categorical' &&
          (property.type === 'discrete' || property.type === 'categorical')
        ) {
          return true;
        } else if (
          colormap.type === 'diverging' &&
          property.type === 'continuous'
        ) {
          return true;
        } else if (
          colormap.type === 'sequential' &&
          property.type === 'continuous'
        ) {
          return true;
        } else if (colormap.name === 'Default') {
          return true;
        }
        return false;
      });
    }
  };

  if (option.type === 'number') {
    return (
      <NumberBox
        propName={option.name}
        propValue={option.value}
        label={option.name}
        placeholder={'Name'}
        handleUpdate={handleUpdate}
        type={'Number'}
        toolTip={option.toolTip}
        max={option.max}
        min={option.min}
        step={option.step}
      />
    );
  } else if (option.type === 'combobox') {
    return (
      <ComboBox
        propName={option.name}
        propValue={option.value}
        items={getProperties(meta, option)}
        handleUpdate={handleUpdate}
      />
    );
  } else if (option.type === 'checkbox') {
    return (
      <CheckBox
        propName={option.name}
        propValue={option.value}
        handleUpdate={handleUpdate}
      />
    );
  } else if (option.type === 'colorpicker') {
    return (
      <ColorPicker
        propName={option.name}
        propValue={option.value}
        items={filterColorMap(
          colormaps,
          option.parentId.dataType,
          meta,
          option.parentId.value
        )}
        handleUpdate={handleUpdate}
      />
    );
  } else {
    return <></>;
  }
};

export default RenderBasedOnType;
