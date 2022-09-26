export const sendGuessEvent = (socket, playerId, playerToken, value) => {
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
                message: "C'est presque ça, continue sur cette voie."
            });
        } else {
            sendMessage({
                level: 'bad',
                message: "Raté, ce n'est pas ça."
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
            message: "Bravo, tu as trouvé !"
        });
    }
};

export const sendMessageOnChat = (socket, categoryId, playerId, playerToken, time, message) => {
    socket.emit('SEND_MESSAGE', {
        categoryId,
        playerId,
        playerToken,
        time,
        message
    });
};