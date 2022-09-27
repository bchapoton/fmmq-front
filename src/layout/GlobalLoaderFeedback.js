import React from 'react';
import { useSelector } from 'react-redux';
import { LinearProgress } from '@mui/material';

function GlobalLoaderFeedback() {
    const loading = useSelector(({ loader }) => loader.load);
    if (loading === true) return <LinearProgress variant="query" color="secondary" />;
    else return <React.Fragment />;
}

export default GlobalLoaderFeedback;
