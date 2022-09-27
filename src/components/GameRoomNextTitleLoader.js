import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { indigo } from '@mui/material/colors';

const useStyle = makeStyles({
    root: {},
    textWrapper: {
        margin: '80px 0 20px 0',
        textAlign: 'center',
        color: indigo[500],
        fontWeight: 'bold',
    },
    loaderWrapper: {
        textAlign: 'center',
    },
});

function GameRoomNextTitleLoader(props) {
    const { displayed } = props;
    const classes = useStyle();

    if (!displayed) return null;

    return (
        <div className={classes.root}>
            <div className={classes.textWrapper}>Prépare toi pour le prochain morceau !</div>
            <div className={classes.loaderWrapper}>
                <CircularProgress size={70} />
            </div>
        </div>
    );
}

GameRoomNextTitleLoader.propTypes = {
    displayed: PropTypes.bool.isRequired,
};

GameRoomNextTitleLoader.defaultProps = {};

export default GameRoomNextTitleLoader;
