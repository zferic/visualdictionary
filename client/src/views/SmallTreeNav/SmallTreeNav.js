import React from 'react';
import TreeMenu, {
  defaultChildren,
  ItemComponent,
} from 'react-simple-tree-menu';
const SmallTreeNav = (props) => {
  return (
    <TreeMenu
      onClickItem={(e) => {
        props.setSelectedSmallNav([e.parent.split('/')[1], e.label]);
        props.setTableData(e.props);
      }}
      hasSearch={false}
    />
  );
};

export default SmallTreeNav;
