import React, {useState} from 'react'
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import JSONPretty from "react-json-pretty";
import JSONPrettyMon from 'react-json-pretty/themes/monikai.css';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";

const useStyle = makeStyles({
    root: {
        padding: '1rem'
    },
    modal: {
        width: '70%',
        margin: '2% 15%',
    },
    container: {
        width: '90%',
        margin: '0 5%',
        maxHeight: '80vh',
        overflow: 'auto'
    }
});

function JSONValue(props) {
    const classes = useStyle();
    const {value, headerLabel} = props;
    const [open, setOpen] = useState(false);
    const [snackbarOpen, setSnackBarOpen] = useState(false);
    const [snackbarTimeoutRef, setSnackbarTimeoutRef] = useState();

    if (!value) {
        return null;
    }

    const toggleModal = (open) => {
        setOpen(open);
    };

    const handleCopyInClipboard = (value) => {
        navigator.clipboard.writeText(value)
            .then(() => {
                setSnackBarOpen(true);
                const timeoutRef = setTimeout(() => {
                    handleSnackbarClose();
                }, 1000);
                setSnackbarTimeoutRef(timeoutRef);
            });
    };

    const handleSnackbarClose = () => {
        setSnackBarOpen(false);
        if(snackbarTimeoutRef) {
            clearTimeout(snackbarTimeoutRef);
            setSnackbarTimeoutRef(null);
        }
    };

    return (
        <React.Fragment>
            <div>
                <Button variant='outlined' size='small' onClick={() => toggleModal(true)}>
                    JSON
                </Button>
                <IconButton variant='outlined' size='small' onClick={() => handleCopyInClipboard(value)}>
                    <FileCopyIcon fontSize='small'/>
                </IconButton>
            </div>
            <Modal
                className={classes.modal}
                open={open}
                onClose={() => toggleModal(false)}
            >
                <Paper>
                    <h2 id="transition-modal-title">{headerLabel}</h2>
                    <div className={classes.container}>
                        <JSONPretty data={value} theme={JSONPrettyMon}/>
                    </div>
                </Paper>
            </Modal>
            <Snackbar
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                open={snackbarOpen}
                onClose={handleSnackbarClose}
                message={`${headerLabel} copié dans le presse papier`}
            />
        </React.Fragment>
    )
}

JSONValue.propTypes = {
    value: PropTypes.string,
    headerLabel: PropTypes.string,
};

JSONValue.defaultProps = {};

export default JSONValue;