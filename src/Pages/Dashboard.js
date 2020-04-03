import React from 'react';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    root: {},
    container: {}
});

function Dashboard() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            Dashboard
        </div>
    );
}

export default Dashboard;
