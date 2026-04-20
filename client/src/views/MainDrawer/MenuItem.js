import React, { useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { margin } from '@mui/system';

const hasChildren = (item) => {
  const { nodes: children } = item;

  if (children === undefined) {
    return false;
  }

  if (children.constructor !== Array) {
    return false;
  }

  if (children.length === 0) {
    return false;
  }

  return true;
};

const MenuItem = ({
  level,
  item,
  parentItem,
  setTableData,
  setSelectedMainNav,
}) => {
  const Component = hasChildren(item) ? MultiLevel : SingleLevel;
  return (
    <Component
      level={level}
      item={item}
      parentItem={parentItem}
      setTableData={setTableData}
      setSelectedMainNav={setSelectedMainNav}
    />
  );
};

const SingleLevel = ({
  level,
  item,
  parentItem,
  setTableData,
  setSelectedMainNav,
}) => {
  const handleSingleLevelClick = () => {
    setSelectedMainNav([parentItem.label, item.label]);
    setTableData(item.props);
  };

  return (
    <ListItemButton
      sx={{
        pl: level * 2 + 3,
        backgroundColor: '#e9f3f0',
      }}
      onClick={handleSingleLevelClick}
    >
      <ListItemText
        primary={item.label}
        primaryTypographyProps={{ color: 'gray' }}
      />
    </ListItemButton>
  );
};

const MultiLevel = ({
  level,
  item,
  parentItem,
  setTableData,
  setSelectedMainNav,
}) => {
  const { nodes: children } = item;
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (open) {
      setTableData([]);
    }
    setOpen((prev) => !prev);
  };

  return (
    <div
      style={{
        backgroundColor:
          level == 0
            ? open
              ? '#c5e7da'
              : 'white'
            : level == 1
            ? '#d2e8e0'
            : '#e9f3f0',
        borderRadius: level == 0 ? 6 : 0,
      }}
    >
      <ListItemButton
        disableTouchRipple={true}
        sx={{
          pl: level * 2 + 3,
          borderLeft: (level == 0) & open ? `5px solid #1a8d5f` : '0',
          // borderRadius: level == 0 ? 4 : 0
        }}
        onClick={handleClick}
      >
        <ListItemText
          primary={item.label}
          primaryTypographyProps={{
            color: level == 0 ? (open ? '#1a8d5f' : 'gray') : 'gray',
            fontWeight: level == 0 ? 'bold' : open ? 'bold' : 'medium',
          }}
        />
        {open ? (
          <ExpandLessIcon
            style={{
              fill: level == 0 ? '#1a8d5f' : 'gray',
              fontSize: level == 0 ? '27px' : '24px',
            }}
          />
        ) : (
          <ExpandMoreIcon
            style={{ fill: 'gray', fontSize: level == 0 ? '27px' : '24px' }}
          />
        )}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children.map((child) => (
            <MenuItem
              level={level + 1}
              key={child.key}
              item={child}
              parentItem={item}
              setTableData={setTableData}
              setSelectedMainNav={setSelectedMainNav}
            />
          ))}
        </List>
      </Collapse>
    </div>
  );
};

export default MenuItem;
