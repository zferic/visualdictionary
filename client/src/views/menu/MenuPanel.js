import React from 'react';
import Group from './Group';
import { Container } from 'react-bootstrap';
import colorData from '../../data/colormap.json';
import { Label, Toggle } from './style';
import { BsArrowBarLeft } from 'react-icons/bs';

const MenuPanel = ({ menuConfig, meta, handleUpdate, changeMenuSize }) => {
  const colormaps = colorData.colormaps;
  return (
    <Container style={{ padding: '2px' }} fluid>
      <Label>
        <Toggle variant="light" onClick={changeMenuSize}>
          <BsArrowBarLeft />
        </Toggle>
        Control Panel
      </Label>
      {Object.keys(menuConfig).map((key, index) => (
        <Group
          key={index}
          groupName={key}
          meta={meta}
          elements={menuConfig[key]}
          handleUpdate={handleUpdate}
          colormaps={colormaps}
        />
      ))}
    </Container>
  );
};

export default MenuPanel;
