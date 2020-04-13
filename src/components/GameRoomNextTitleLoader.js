import React from 'react';
import PropTypes from "prop-types";
import {CircularProgress} from "@material-ui/core";

function GameRoomNextTitleLoader(props) {
    const {displayed} = props;

    if (!displayed)
        return null;

    return (
        <div>
            <span>Prépare toi pour le prochain morceau !</span>
            <CircularProgress/>
        </div>
    )
}


GameRoomNextTitleLoader.propTypes = {
    displayed: PropTypes.bool.isRequired
};

GameRoomNextTitleLoader.defaultProps = {};

export default GameRoomNextTitleLoader;