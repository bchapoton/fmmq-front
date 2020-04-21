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

import {decrypt} from "./GameService";

export const sendGuessEvent = (socket, playerId, playerToken, value) => {
    console.log('emit');
    socket.emit('GUESS', {
        playerId,
        playerToken,
        value
    });
};

export const onEnter = (gamePlayers, leaderBoardSummary, payload) => {
    // check if player already here, in case of he leave the room and comeback or open 2 tabs
    if (gamePlayers.findIndex(player => player.id === payload.id) === -1) {
        gamePlayers.push(payload);
        leaderBoardSummary['none'] = leaderBoardSummary['none'] + 1;
    }
};

export const onFailed = (playerId, sendMessage, payload) => {
    if (playerId === payload.playerId) {
        if (payload.accuracy >= 0.5) {
            sendMessage({
                level: 'not-bad',
                message: "C'est presque ça, continue sur cette voie"
            });
        } else {
            sendMessage({
                level: 'bad',
                message: "T'es bête ou bien ?"
            });
        }
    }
};

export const onGuessed = (localPLayerId, gamePlayers, leaderBoardSummary, leaderBoardGuessed, currentMusicPodium, sendMessage, setArtist, setTitle, payload) => {
    // update player score
    const playerId = payload.playerId;
    const playerObjectIndex = gamePlayers.findIndex(
        (item) => {
            return item.id === playerId;
        }
    );
    gamePlayers[playerObjectIndex]['score'] = gamePlayers[playerObjectIndex]['score'] + payload.points;

    // leader board summary update
    if (payload.found === 'BOTH' || payload.foundEveryThing) {
        leaderBoardSummary['both'] = leaderBoardSummary['both'] + 1;
    } else if (payload.found === 'ARTIST') {
        leaderBoardSummary['artist'] = leaderBoardSummary['artist'] + 1;
    } else if (payload.found === 'TITLE') {
        leaderBoardSummary['title'] = leaderBoardSummary['title'] + 1;
    }

    if (payload.alreadyFound === 'ARTIST') {
        leaderBoardSummary['artist'] = leaderBoardSummary['artist'] - 1;
    } else if (payload.alreadyFound === 'TITLE') {
        leaderBoardSummary['title'] = leaderBoardSummary['title'] - 1;
    } else if (payload.alreadyFound === 'NONE') {
        leaderBoardSummary['none'] = leaderBoardSummary['none'] - 1;
    }

    // Update leader board guessed object, handle user per user what he guessed on the current song and eventually the trophy
    let leaderBoardGuessedIndex = leaderBoardGuessed.findIndex(
        (item) => {
            return item.playerId === playerId;
        }
    );

    if (leaderBoardGuessedIndex < 0) {
        leaderBoardGuessedIndex = leaderBoardGuessed.push({playerId: playerId}) - 1;
    }
    leaderBoardGuessed[leaderBoardGuessedIndex].found = payload.found;
    if (payload.trophy) {
        leaderBoardGuessed[leaderBoardGuessedIndex].trophy = payload.trophy;
        let podiumKey;
        if (payload.trophy === 1) {
            podiumKey = "first"
        } else if (payload.trophy === 2) {
            podiumKey = "second"
        } else if (payload.trophy === 3) {
            podiumKey = "third"
        }
        if (podiumKey)
            currentMusicPodium[podiumKey] = gamePlayers[playerObjectIndex]['nickname'];
    }

    // IHM feedback for the concerned user
    if (playerId === localPLayerId) {
        // Update IHM with music found values
        if (payload.music) {
            if (payload.music.artist) {
                setArtist(payload.music.artist);
            }
            if (payload.music.title) {
                setTitle(payload.music.title);
            }
        }

        sendMessage({
            level: 'nice',
            message: "Bien ouej pelo, le 69 la trik t'habite !"
        });
    }
};