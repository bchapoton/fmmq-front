import React from 'react'
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles({
    root: {
        padding: '1rem'
    }
});

function CGU() {
    const classes = useStyle();

    return (
        <div className={classes.root}>
            <h1>Ni dieu Ni maître !</h1>
            <Typography variant='body1'>
                J'ai pas à te dire comment te comporter.<br/>
                Tu n'es même pas obligé de les accepter d'ailleurs !
            </Typography>
        </div>
    )
}

export default CGU;