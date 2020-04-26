import React from 'react';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    root: {
        padding: '1rem',
        textAlign: 'center'
    },
    image: {
        height: '70vh',
        maxHeight: '522px'
    }
});

function NotFound() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <img
                className={classes.image}
                alt='Page not found'
                src='/assets/img/404.jpg'
            />
        </div>
    );
}

export default NotFound;
