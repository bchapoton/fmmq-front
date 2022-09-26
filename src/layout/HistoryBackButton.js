import React from 'react'
import Button from "@mui/material/Button";

export default function HistoryBackButton(props) {
    const {children} = props;
    return (
        <Button
            variant='contained'
            color='primary'
            {...props}
            onClick={(e) => {
                e.preventDefault();
                window.history.back();
            }}
        >
            {children ? children : 'retour'}
        </Button>
    );
}