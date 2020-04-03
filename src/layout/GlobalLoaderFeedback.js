import React from 'react'
import {makeStyles} from "@material-ui/styles";
import {useSelector} from "react-redux";
import {LinearProgress} from "@material-ui/core";

const useStyle = makeStyles({
    backdrop: {}
});

function GlobalLoaderFeedback() {
    const loading = useSelector(({loader}) => loader.load);
    return (<LinearProgress hidden={!loading} variant="query" color="secondary"/>);
}

export default GlobalLoaderFeedback;