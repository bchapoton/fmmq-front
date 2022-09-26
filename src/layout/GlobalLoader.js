import React from 'react'
import {makeStyles} from "@mui/styles";
import {useSelector} from "react-redux";

const useStyle = makeStyles({
    root: {
        position: 'absolute',
        // backgroundColor: 'black',
        opacity: '0.5',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 9999,
    }
});

function GlobalLoader() {
    const classes = useStyle();
    const loading = useSelector(({loader}) => loader.load);

    if (loading) {
        return (<div className={classes.root}>&nbsp;</div>);
    } else return (<React.Fragment/>);
}

export default GlobalLoader;