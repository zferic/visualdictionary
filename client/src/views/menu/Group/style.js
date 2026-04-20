import styled from 'styled-components';
import { Button, Row, Col } from 'react-bootstrap';

export const MyGroup = styled.div`
  border-style: solid;
  margin-bottom: 2px;
  width: 100%;
  border-color: lightgray;
  border-width: 1px;
  border-radius: 5px;
  padding-bottom: 4px;
`;

export const MyLabel = styled.div`
  text-align: left;
  padding: 2px 0px 2px 0px;
`;

export const MyCol = styled(Col)`
  padding: 0px;
  margin: auto;
`;

export const MyRow = styled(Row)`
  margin: 0px;
`;

export const MyToggle = styled(Button)`
  width: 100%;
  background-color: lightgray;
  color: black;
  border-radius: 4px 4px 0px 0px;
  padding: 2px 2px 2px 2px;
  border-color: lightgray;
`;
