import React from 'react';
import PropTypes from "prop-types";
import {
    PlayerIconArtistFound, PlayerIconBothFound,
    PlayerIconFirstFound,
    PlayerIconSecondFound,
    PlayerIconThirdFound, PlayerIconTitleFound
} from "./LeaderBoardPlayerIcon";

function LeaderBoardGuessedCellContent(props) {
    const {leaderBoardGuessed, playerId} = props;

    const index = leaderBoardGuessed.findIndex(
        (item) => {
            return item.playerId === playerId;
        }
    );

    if (index < 0) {
        return (<span>&nbsp;</span>);
    }

    return (
        <React.Fragment>
            {leaderBoardGuessed[index].found === 'ARTIST' ? (<PlayerIconArtistFound/>) : null}
            {leaderBoardGuessed[index].found === 'TITLE' ? (<PlayerIconTitleFound/>) : null}
            {leaderBoardGuessed[index].found === 'BOTH' ? (<PlayerIconBothFound/>) : null}
            {leaderBoardGuessed[index].trophy === 1 ? (<PlayerIconFirstFound/>) : null}
            {leaderBoardGuessed[index].trophy === 2 ? (<PlayerIconSecondFound/>) : null}
            {leaderBoardGuessed[index].trophy === 3 ? (<PlayerIconThirdFound/>) : null}
        </React.Fragment>
    );
}

LeaderBoardGuessedCellContent.propTypes = {
    playerId: PropTypes.number.isRequired,
    leaderBoardGuessed: PropTypes.array
};

LeaderBoardGuessedCellContent.defaultProps = {};

export default LeaderBoardGuessedCellContent;
