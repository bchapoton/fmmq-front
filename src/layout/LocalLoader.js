import React from 'react'
import {CircularProgress} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles({
   root: {
       display: 'flex',
       alignItems: 'center',
       justifyContent: 'center',
       width: '100%',
       height: '100%'
   }
});

function LocalLoader() {
    const classes = useStyle();
    return (<div className={classes.root}><CircularProgress/></div>);
}

export default LocalLoader;