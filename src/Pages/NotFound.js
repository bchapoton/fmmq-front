import React from 'react';
import {makeStyles} from "@material-ui/styles";
import {Link} from "react-router-dom";

const useStyles = makeStyles({
    root: {},
    container: {}
});

function NotFound() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            Page not found !
            <br/>
            <Link to='/'>Go home</Link>
        </div>
    );
}

export default NotFound;
