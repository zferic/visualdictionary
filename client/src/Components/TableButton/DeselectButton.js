import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';

const DeselectButton = ({ buttonLabel, onClickHandler }) => (
    <Button style={{ backgroundColor: "#feeee6", borderColor: '#f7e8e0', marginLeft: 10 }} size="large"
        variant="outlined" startIcon={<HighlightOffOutlinedIcon style={{ fill: "#bf6222" }} />}
        onClick={onClickHandler}>
        <Typography style={{ color: "#bf6222", fontSize: 13, fontWeight: 'bold' }}>
            {buttonLabel}
        </Typography>
    </Button>)
export default DeselectButton;
