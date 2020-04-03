/*
----- ENTER event : Player enter in the game room
{
    type: 'ENTER',
    payload: {
        id: 2,
        nickname: 'Player 2',
        score: 0
    }
}
----- LEAVE event : Player leave the game room
{
    type: 'LEAVE',
    payload: {
        playerId: 1
    }
}
----- GUESSED event : Player guessed something with his try
{
    type: 'GUESSED',
    payload: {
        playerId: 1,
        points: 3,
        found: '', // ARTIST, TITLE, BOTH : defined whats the player found after the try (event if the player find the artist or the title before this try the value will be BOTH, this value is used to update the leaderboard summary)
        alreadyFound: '', // NONE, ARTIST, TITLE : defined whats the player already found before the try (used to update leaderboard summary, combined with the found attribute we will know which leaderboard summary attribute need to be decrement before increment the new one)
        trophy: 1 // 1, 2 or 3 if the user find the both title and artist the first, second or third, none otherwise
    }
}
----- FAILED event : Player failed his try
{
    type: 'FAILED',
    payload: {
        playerId: 1,
        accuracy: '' // defined if the player was closed to find with his try or if it is a dumb try
    }
}
*/

import {buildLeaderBoardGuessedKey} from "./GameService";

export const handleEvents = (event, gamePlayers, leaderBoardSummary, leaderBoardGuessed) => {
    if (!event.type) {
        console.log(`malformed event : ${JSON.stringify(event)}`);
        return;
    }

    const gamePlayersNew = [...gamePlayers];
    const leaderBoardGuessedNew = [...leaderBoardGuessed];
    const leaderBoardSummaryNew = Object.assign({}, leaderBoardSummary);
    let message;

    if (event.type === 'ENTER') {
        gamePlayersNew.push(event.payload);
        leaderBoardSummaryNew['none'] = leaderBoardSummaryNew['none'] + 1;
    } else if (event.type === 'LEAVE') {
        if(!(event.payload && event.payload.playerId)) {
            console.log(`malformed event : ${JSON.stringify(event)}`);
            return;
        }
        const playerId = event.payload.playerId;
        gamePlayersNew.splice(gamePlayersNew.findIndex(
            (item) => {
                return item.id === playerId;
            }
        ), 1);
        // no need to update the leaderboard summary in leave case, the end of the current music will clean the summary
    } else if (event.type === 'GUESSED') {
        // update player score
        const playerId = event.payload.playerId;
        const playerObjectIndex = gamePlayersNew.findIndex(
            (item) => {
                return item.id === playerId;
            }
        );
        gamePlayersNew[playerObjectIndex]['score'] = gamePlayersNew[playerObjectIndex]['score'] + event.payload.points;

        // leader board summary update
        if(event.payload.found === 'ARTIST') {
            leaderBoardSummaryNew['artist'] = leaderBoardSummaryNew['artist'] + 1;
        } else if(event.payload.found === 'TITLE') {
            leaderBoardSummaryNew['title'] = leaderBoardSummaryNew['title'] + 1;
        } else if(event.payload.found === 'BOTH') {
            leaderBoardSummaryNew['both'] = leaderBoardSummaryNew['both'] + 1;
        }

        if(event.payload.alreadyFound === 'ARTIST') {
            leaderBoardSummaryNew['artist'] = leaderBoardSummaryNew['artist'] - 1;
        } else if(event.payload.alreadyFound === 'TITLE') {
            leaderBoardSummaryNew['title'] = leaderBoardSummaryNew['title'] - 1;
        } else if(event.payload.alreadyFound === 'NONE') {
            leaderBoardSummaryNew['none'] = leaderBoardSummaryNew['none'] - 1;
        }

        // Update leader board guessed object, handle user per user what he guessed on the current song and eventually the trophy
        let leaderBoardGuessedIndex = leaderBoardGuessed.findIndex(
            (item) => {
                return item.playerId === playerId;
            }
        );

        if(leaderBoardGuessedIndex < 0) {
            leaderBoardGuessedIndex = leaderBoardGuessedNew.push({playerId: playerId}) -1;
        }
        leaderBoardGuessedNew[leaderBoardGuessedIndex].found = event.payload.found;
        if(event.payload.trophy) {
            leaderBoardGuessedNew[leaderBoardGuessedIndex].trophy = event.payload.trophy;
        }
        // IHM feedback
        message = {
            level: 'nice',
            content: "Bien ouej pelo, le 69 la trik t'habite !"
        };
    } else if (event.type === 'FAILED') {
        if(event.accuracy > 0.7) {
            message = {
                level: 'not-bad',
                content: "C'est presque ça, continue sur cette voie"
            };
        } else {
            message = {
                level: 'bad',
                content: "T'es bête ou bien ?"
            };
        }
    }

    return {gamePlayersNew, leaderBoardSummaryNew, leaderBoardGuessedNew, message};
};

export function debugEnter(nickname, gamePlayers, leaderBoardSummary, leaderBoardGuessed) {
    return handleEvents(
        {
            type: 'ENTER',
            payload: {
                id: gamePlayers.length + 1,
                nickname: `Player ${gamePlayers.length + 1}`,
                score: 0
            }
        },
        gamePlayers,
        leaderBoardSummary,
        leaderBoardGuessed
    )
}

export function debugLeave(playerId, gamePlayers, leaderBoardSummary, leaderBoardGuessed) {
    return handleEvents(
        {
            type: 'LEAVE',
            payload: {
                playerId: playerId
            }
        },
        gamePlayers,
        leaderBoardSummary,
        leaderBoardGuessed
    )
}

export function debugGuessed(playerId, gamePlayers, leaderBoardSummary, leaderBoardGuessed) {
    return handleEvents(
        {
            type: 'GUESSED',
            payload: {
                playerId: playerId,
                points: 3,
                found: 'BOTH', // ARTIST, TITLE, BOTH : defined whats the player found after the try (event if the player find the artist or the title before this try the value will be BOTH, this value is used to update the leaderboard summary)
                alreadyFound: 'NONE', // NONE, ARTIST, TITLE : defined whats the player already found before the try (used to update leaderboard summary, combined with the found attribute we will know which leaderboard summary attribute need to be decrement before increment the new one)
                trophy: 1
            }
        },
        gamePlayers,
        leaderBoardSummary,
        leaderBoardGuessed
    )
}

export function debugFailed(playerId, gamePlayers, leaderBoardSummary, leaderBoardGuessed) {
    return handleEvents(
        {
            type: 'FAILED',
            payload: {
                playerId: playerId,
                accuracy: 0.1 // defined if the player was closed to find with his try or if it is a dumb try
            }
        },
        gamePlayers,
        leaderBoardSummary,
        leaderBoardGuessed
    )
}