import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';

const UpsetDataButton = ({ buttonLabel, onClickHandler }) => (
  <Button
    style={{
      backgroundColor: '#e9f3f0',
      borderColor: '#d2e8e0',
      marginLeft: 10,
    }}
    size="large"
    variant="outlined"
    startIcon={<ShowChartOutlinedIcon style={{ fill: '#1a8d5f' }} />}
    onClick={onClickHandler}
  >
    <Typography style={{ color: '#1a8d5f', fontSize: 13, fontWeight: 'bold' }}>
      {buttonLabel}
    </Typography>
  </Button>
);
export default UpsetDataButton;
