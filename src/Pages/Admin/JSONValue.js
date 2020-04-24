import React from 'react'
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyle = makeStyles({
    root: {
        padding: '1rem'
    }
});

function JSONValue(props) {
    const classes = useStyle();
    const {value} = props;

    if (!value) {
        return null;
    }

    return (
        <div className={classes.root}>
            JSONValue
        </div>
    )
}


JSONValue.propTypes = {
    value: PropTypes.string
};

JSONValue.defaultProps = {};

export default JSONValue;