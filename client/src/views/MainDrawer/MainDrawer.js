import React, { useState } from 'react';
import MenuItem from './MenuItem';

const MainDrawer = ({ treeNav, setTableData, setSelectedMainNav }) => {
  const DrawerStyling = {
    boxShadow: '1px 0 0 0',
    // borderRight: "1px solid #f1f2f9",
    paddingRight: 10,
  };
  return (
    <div style={DrawerStyling}>
      {treeNav.map((item) => (
        <MenuItem
          level={0}
          key={item.key}
          item={item}
          parentItem={{}}
          setTableData={setTableData}
          setSelectedMainNav={setSelectedMainNav}
        />
      ))}
    </div>
  );
};

export default MainDrawer;
