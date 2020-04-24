import React from 'react'
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyle = makeStyles({
    root: {
        padding: '1rem'
    }
});

function AdminLoadingErrorDisplay(props) {
    const classes = useStyle();
    const {loading, error} = props;

    if (loading) {
        return (<span>loading</span>);
    }

    if (error) {
        return (<span>{error}</span>);
    }

    return null;
}

AdminLoadingErrorDisplay.propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.any
};

AdminLoadingErrorDisplay.defaultProps = {
    loading: true,
    error: null
};

export default AdminLoadingErrorDisplay;