import React from 'react'
import {makeStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import {blue} from "@material-ui/core/colors";
import history from "../layout/utils/history";
import {ROUTE_DASHBOARD} from "../router/routes";

const useStyle = makeStyles({
    root: {
        position: 'relative',
        padding: '30px 0',
        textAlign: 'center'
    },
    backButton: {
        position: 'absolute',
        backgroundColor: blue[100],
        color: blue[900],
        left: '10px',
        top: '10px'
    }
});

function TipeeePage() {
    const classes = useStyle();

    return (
        <div className={classes.root}>
            <img alt="thanks you" src='assets/img/thanks.jfif'/>
            <IconButton
                className={classes.backButton}
                onClick={e => history.push(ROUTE_DASHBOARD)}
            >
                <KeyboardBackspaceIcon/>
            </IconButton>
        </div>
    );
}

export default TipeeePage;