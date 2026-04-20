import React, { useState } from 'react';
import SmallMenuItem from './SmallMenuItem';

const SmallDrawer = ({ smallTableNav, setSmallTable, setSelectedSmallNav }) => {
  const DrawerStyling = {
    boxShadow: '1px 0 0 0',
    // borderRight: "1px solid #f1f2f9",
    paddingRight: 10,
  };

  return (
    <div style={DrawerStyling}>
      {smallTableNav.map((item) => (
        <SmallMenuItem
          level={0}
          key={item.key}
          item={item}
          parentItem={{}}
          setSmallTable={setSmallTable}
          setSelectedSmallNav={setSelectedSmallNav}
        />
      ))}
    </div>
  );
};

export default SmallDrawer;
