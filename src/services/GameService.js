import React from 'react';

export const getPlayersInRoom = (categoryId) => {
    return [
        {
            id: 1,
            nickname: 'Player 1',
            score: 20
        },
        {
            id: 2,
            nickname: 'Player 2',
            score: 3
        },
        {
            id: 3,
            nickname: 'Player 3',
            score: 16
        }
    ];
};

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