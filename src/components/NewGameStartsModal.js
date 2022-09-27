import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@mui/styles';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import theme from "../layout/MUITheme";
import {DialogActions, DialogContent} from "@mui/material";
import {generateRoute, ROUTE_PLAY} from "../router/routes";
import {useNavigate} from "react-router-dom";

const useStyles = makeStyles({
    heading: {
        fontWeight: 'bold',
        fontSize: theme.typography.pxToRem(20)
    }
});

const redirectCounterValue = 4;

export default function NewGameStartsModal(props) {
    const classes = useStyles();
    const {onClose, open, nickname, categoryId} = props;
    const roomUrl = generateRoute(ROUTE_PLAY, {name: ':categoryId', value: categoryId});
    const [timeoutRef, setTimeoutRef] = useState();
    const [intervalRef, setIntervalRef] = useState();
    const [redirectCounter, setRedirectCounter] = useState(redirectCounterValue);

    const handleClose = () => {
        onClose();
    };

    const navigate = useNavigate();

    useEffect(() => {
        return () => {
            clearTimers(timeoutRef, setTimeoutRef, intervalRef, setIntervalRef);
        }
    }, []);

    useEffect(() => {
        let timeoutRef = null;
        let intervalRef = null;
        if (open) {
            intervalRef = setInterval(() => {
                setRedirectCounter(previous => {
                    return previous - 1;
                });
            }, 1000);
            setIntervalRef(intervalRef);
            timeoutRef = setTimeout(() => {
                clearTimers(timeoutRef, setTimeoutRef, intervalRef, setIntervalRef);
                navigate(roomUrl);
            }, 1000 * redirectCounterValue);
            setTimeoutRef(timeoutRef);
        } else {
            clearTimers(timeoutRef, setTimeoutRef, intervalRef, setIntervalRef);
        }
    }, [open]);

    return (
        <Dialog
            onClose={handleClose}
            aria-labelledby="navigator-need-music-permission"
            open={open}
        >
            <DialogTitle
                id="navigator-need-music-permission"
            >
                <Typography className={classes.heading}>
                    {nickname ? `${nickname} a relancé une partie !` : 'Une partie a été relancée !'}
                </Typography>
            </DialogTitle>
            <DialogContent>
                Tu seras redirigé dans la partie automatiquement dans <b>{redirectCounter} secondes</b>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        clearTimers(timeoutRef, setTimeoutRef, intervalRef, setIntervalRef);
                        onClose();
                    }}
                >
                    Je vais m'arrêter la
                </Button>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={() => {
                        clearTimers(timeoutRef, setTimeoutRef, intervalRef, setIntervalRef);
                        navigate(roomUrl);
                    }}
                >
                    J'y vais
                </Button>
            </DialogActions>
        </Dialog>
    );
}

function clearTimers(timeoutRef, setTimeoutRef, intervalRef, setIntervalRef) {
    if (timeoutRef) {
        console.log('clear timeout');
        clearTimeout(timeoutRef);
        setTimeoutRef(null);
    }
    if (intervalRef) {
        console.log('clear interval');
        clearInterval(intervalRef);
        setIntervalRef(null);
    }
}

NewGameStartsModal.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    nickname: PropTypes.string,
    categoryId: PropTypes.string.isRequired,
};

NewGameStartsModal.defaultProps = {
    open: false
};