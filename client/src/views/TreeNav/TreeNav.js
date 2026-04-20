import React from 'react';
import TreeMenu, {
  defaultChildren,
  ItemComponent,
} from 'react-simple-tree-menu';
const TreeNav = (props) => {
  return (
    <TreeMenu
      data={props.data}
      onClickItem={(e) => {
        props.setTableData(e.props);
      }}
      hasSearch={false}
    />
  );
};

export default TreeNav;
