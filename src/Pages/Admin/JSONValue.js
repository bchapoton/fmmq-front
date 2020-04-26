import React, {useState} from 'react'
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import JSONPretty from "react-json-pretty";
import JSONPrettyMon from 'react-json-pretty/themes/monikai.css';


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

    if (!value) {
        return null;
    }

    const toggleModal = (open) => {
        setOpen(open);
    };

    return (
        <React.Fragment>
            <Button variant='outlined' onClick={() => toggleModal(true)}>
                JSONValue
            </Button>
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
        </React.Fragment>
    )
}


JSONValue.propTypes = {
    value: PropTypes.string,
    headerLabel: PropTypes.string,
};

JSONValue.defaultProps = {};

export default JSONValue;