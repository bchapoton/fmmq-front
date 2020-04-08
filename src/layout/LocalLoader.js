import React from 'react'
import {CircularProgress} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import PropTypes from "prop-types";

const useStyle = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    flex: {
        flex: 1
    },
    height: {
        height: '100%'
    }
});

function LocalLoader(props) {
    const {children, load, flex} = props;
    const classes = useStyle();
    if (load)
        return (<div className={clsx(classes.root, flex ? classes.flex : classes.height)}><CircularProgress/></div>);
    else return children ? children : null;
}

LocalLoader.propTypes = {
    flex: PropTypes.bool,
    load: PropTypes.bool
};

LocalLoader.defaultProps = {
    flex: false,
    load: true
}

export default LocalLoader;