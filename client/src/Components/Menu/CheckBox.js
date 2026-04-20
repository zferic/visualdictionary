import { update } from 'lodash';
import React from 'react';
import { MyCheckBox } from './style';

const CheckBox = (props) => {
  function setNewData(updateTarget) {
    var smallTableData = props.table;
    if (updateTarget == true) {
      smallTableData.push(props.rowInfo);
    } else {
      const index = smallTableData.indexOf(props.rowInfo);
      if (index > -1) {
        smallTableData.splice(index, 1);
      }
    }

    props.setSmallUpdate(smallTableData);
  }
  return (
    <MyCheckBox size="lg" onChange={(e) => setNewData(e.target.checked)} />
  );
};

export default CheckBox;
