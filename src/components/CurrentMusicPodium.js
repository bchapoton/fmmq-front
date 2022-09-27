import React from 'react';
import {makeStyles} from "@mui/styles";
import {PlayerIconFirstFound, PlayerIconSecondFound, PlayerIconThirdFound} from "./LeaderBoardPlayerIcon";
import PropTypes from "prop-types";
import clsx from "clsx";
import {cyan} from "@mui/material/colors";

const useStyle = makeStyles({
    root: {
        width: '94%',
        margin: '0 3%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    title: {
        color: cyan[50],
        textAlign: 'center'
    },
    podiumItem: {
        display: 'flex',
        margin: '10px 0'
    },
    podiumItemPlayer: {
        flexGrow: 1,
        marginLeft: '20px',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    hidden: {
        display: 'none'
    }
});

function CurrentMusicPodium(props) {
    const {currentMusicPodium, displayed} = props;
    const classes = useStyle();

    if(!displayed) {
        return null;
    }

    return (
        <div className={classes.root}>
        <h4 className={classes.title}>Morceau en cours</h4>
        <div className={clsx(classes.podiumItem, currentMusicPodium.first ? null : classes.hidden)}>
            <PlayerIconFirstFound/>
            <span className={classes.podiumItemPlayer}>{currentMusicPodium.first}</span>
        </div>
        <div className={clsx(classes.podiumItem, currentMusicPodium.second ? null : classes.hidden)}>
            <PlayerIconSecondFound/>
            <span className={classes.podiumItemPlayer}>{currentMusicPodium.second}</span>
        </div>
        <div className={clsx(classes.podiumItem, currentMusicPodium.third ? null : classes.hidden)}>
            <PlayerIconThirdFound/>
            <span className={classes.podiumItemPlayer}>{currentMusicPodium.third}</span>
        </div>
    </div>
    );
}


CurrentMusicPodium.propTypes = {
    displayed: PropTypes.bool.isRequired,
    currentMusicPodium: PropTypes.object
};

CurrentMusicPodium.defaultProps = {};

export default CurrentMusicPodium;