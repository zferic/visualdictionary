import React from 'react';
import { Form } from 'react-bootstrap';

const ComboBox = ({ propValue, propName, items, handleUpdate }) => {
  return (
    <Form.Control
      as="select"
      name={propName}
      onChange={handleUpdate}
      value={propValue}
      style={{ padding: '2px', margin: '2px 0px 2px 0px' }}
    >
      {items.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </Form.Control>
  );
};

export default ComboBox;
