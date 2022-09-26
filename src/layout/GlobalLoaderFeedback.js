import React from 'react'
import {useSelector} from "react-redux";
import {LinearProgress} from "@mui/material";

function GlobalLoaderFeedback() {
    const loading = useSelector(({loader}) => loader.load);
    return (<LinearProgress hidden={!loading} variant="query" color="secondary"/>);
}

export default GlobalLoaderFeedback;