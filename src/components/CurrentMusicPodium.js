import React from 'react';
import { makeStyles } from '@mui/styles';
import { PlayerIconFirstFound, PlayerIconSecondFound, PlayerIconThirdFound } from './LeaderBoardPlayerIcon';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { cyan } from '@mui/material/colors';

const useStyle = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        minHeight: '40px',
    },
    title: {
        color: cyan[50],
        textAlign: 'center',
        margin: '5px 0',
    },
    podiumItem: {},
    podiumItemPlayer: {
        maxWidth: '200px',
        flexGrow: 1,
        marginLeft: '20px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        color: cyan[50],
    },
    hidden: {
        display: 'none',
    },
});

function CurrentMusicPodium(props) {
    const { currentMusicPodium, displayed } = props;
    const classes = useStyle();

    if (!displayed) {
        return <div className={classes.root} />;
    }

    return (
        <div className={classes.root}>
            <h4 className={classes.title}>Podium morceau en cours</h4>
            <div className={clsx(classes.podiumItem, currentMusicPodium.first ? null : classes.hidden)}>
                <PlayerIconFirstFound />
                <span className={classes.podiumItemPlayer}>{currentMusicPodium.first}</span>
            </div>
            <div className={clsx(classes.podiumItem, currentMusicPodium.second ? null : classes.hidden)}>
                <PlayerIconSecondFound />
                <span className={classes.podiumItemPlayer}>{currentMusicPodium.second}</span>
            </div>
            <div className={clsx(classes.podiumItem, currentMusicPodium.third ? null : classes.hidden)}>
                <PlayerIconThirdFound />
                <span className={classes.podiumItemPlayer}>{currentMusicPodium.third}</span>
            </div>
        </div>
    );
}

CurrentMusicPodium.propTypes = {
    displayed: PropTypes.bool.isRequired,
    currentMusicPodium: PropTypes.object,
};

CurrentMusicPodium.defaultProps = {};

export default CurrentMusicPodium;
