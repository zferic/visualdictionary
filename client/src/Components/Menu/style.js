import { Dropdown, Form, Image } from 'react-bootstrap';
import styled from 'styled-components';

export const MyNumberInput = styled.input`
  padding: 2px;
  width: 100%;
  border: 1px #e0dbdb solid;
  border-radius: 4px;
  margin: 2px 0px 2px 0px;
`;

export const MyIcon = styled(Image)`
  width: 60px;
  height: 18px;
`;

export const MyDropdownToggle = styled(Dropdown.Toggle)`
  width: 100%;
  background-color: white;
  color: #495057;
  padding: 6px 3px 6px 6px;
  border: 1px solid lightgray;
  margin: 2px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:after {
  }
`;

export const MyDropdownItem = styled(Dropdown.Item)`
  padding: 0px 4px;
`;

export const MyCheckBox = styled(Form.Check)`
  zoom: 1.3;
`;
