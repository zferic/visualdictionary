import React, { useState } from 'react';
import { MyGroup, MyToggle, MyLabel, MyRow, MyCol } from './style';
import { Collapse } from 'react-bootstrap';
import RenderBasedOnType from './RenderBasedOntype';

const Group = ({ groupName, meta, elements, colormaps, handleUpdate }) => {
  const [open, setOpen] = useState(true);

  return (
    <MyGroup>
      <MyToggle
        variant="light"
        onClick={() => setOpen(!open)}
        aria-controls={{ groupName } + '-collapse'}
        aria-expanded={open}
      >
        {groupName}
      </MyToggle>
      <Collapse in={open}>
        <div id="example-collapse-text">
          {Object.keys(elements).map((key, index) => (
            <MyRow key={index}>
              <MyCol>
                <MyLabel>{elements[key].name}:</MyLabel>
              </MyCol>
              <MyCol>
                <RenderBasedOnType
                  label={index}
                  option={elements[key]}
                  colormaps={colormaps}
                  meta={meta}
                  handleUpdate={(e) => {
                    handleUpdate(groupName, e);
                  }}
                />
              </MyCol>
            </MyRow>
          ))}
        </div>
      </Collapse>
    </MyGroup>
  );
};

export default Group;
