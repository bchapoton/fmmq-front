import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { indigo } from '@mui/material/colors';

const useStyle = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textWrapper: {
        textAlign: 'center',
        color: indigo[500],
        fontWeight: 'bold',
    },
    loaderWrapper: {
        textAlign: 'center',
        marginRight: 10,
    },
});

function GameRoomNextTitleLoader(props) {
    const { displayed } = props;
    const classes = useStyle();

    if (!displayed) return null;

    return (
        <div className={classes.root}>
            <div className={classes.loaderWrapper}>
                <CircularProgress size={30} />
            </div>
            <div className={classes.textWrapper}>Prépare toi pour le prochain morceau !</div>
        </div>
    );
}

GameRoomNextTitleLoader.propTypes = {
    displayed: PropTypes.bool.isRequired,
};

GameRoomNextTitleLoader.defaultProps = {};

export default GameRoomNextTitleLoader;
