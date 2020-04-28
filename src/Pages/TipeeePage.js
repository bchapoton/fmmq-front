import React from 'react'
import {makeStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import {blue} from "@material-ui/core/colors";
import history from "../layout/utils/history";
import {ROUTE_DASHBOARD} from "../router/routes";
import ButtonContainer from "../layout/ButtonContainer";
import HistoryBackButton from "../layout/HistoryBackButton";

const useStyle = makeStyles({
    root: {
        padding: '1rem',
        textAlign: 'center'
    }
});

function TipeeePage() {
    const classes = useStyle();

    return (
        <div className={classes.root}>
            <ButtonContainer>
                <HistoryBackButton/>
            </ButtonContainer>
            <img alt="thanks you" src='assets/img/thanks.jfif'/>
        </div>
    );
}

export default TipeeePage;