import React from 'react';

export const sortPayersInRoom = (playersInRoom) => {
    if (!playersInRoom || playersInRoom.length === 0) {
        return playersInRoom;
    }

    return playersInRoom.slice().sort((item1, item2) => {
        const score1 = item1.score ? item1.score : 0;
        const score2 = item2.score ? item2.score : 0;
        return (score1 - score2) * -1; // desc sorting
    });
};

export const buildLeaderBoardGuessedKey = (playerId) => {
    return 'guess' + playerId;
};