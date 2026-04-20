import React from 'react';
import { MyNumberInput } from './style';

const NumberBox = ({
  propValue,
  propName,
  placeholder,
  handleUpdate,
  toolTip,
  min,
  max,
  step,
}) => {
  return (
    <>
      <MyNumberInput
        type="number"
        min={min}
        max={max}
        step={step}
        name={propName}
        value={propValue}
        onChange={handleUpdate}
      />
    </>
  );
};

export default NumberBox;
