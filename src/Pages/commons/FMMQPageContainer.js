import React from 'react';
import {makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles({
    root: {
        padding: '1rem'
    }
});

function FMMQPageContainer(props) {
    const {children} = props;
    const classes = useStyle();

    return (<div className={classes.root}>{children}</div>)
}

export default FMMQPageContainer;