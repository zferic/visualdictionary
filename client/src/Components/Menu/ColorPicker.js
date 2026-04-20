import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { MyIcon, MyDropdownToggle, MyDropdownItem } from './style';

const ColorPicker = ({ propValue, propName, items, handleUpdate }) => {
  const selectedColorMap = items[items.find(({ name }) => name === propValue)];
  return (
    <Dropdown
      onSelect={(eventKey) => {
        handleUpdate({
          target: { name: propName, value: eventKey, type: 'colorpicker' },
        });
      }}
    >
      <MyDropdownToggle
        variant="light"
        id={'color' + propName}
        className="text-left"
      >
        {selectedColorMap && selectedColorMap.filename !== '' && (
          <MyIcon src={selectedColorMap.filename} />
        )}
        {propValue}
      </MyDropdownToggle>

      <Dropdown.Menu>
        {items.map(({ name, filename }) => (
          <MyDropdownItem key={name} eventKey={name}>
            {filename !== '' && <MyIcon src={filename} />} {name}
          </MyDropdownItem>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ColorPicker;
