import React from 'react';
import { useParams } from 'react-router-dom';
import GameSummary from '../components/GameSummary';

function EndGame() {
    const { gameId } = useParams();
    return <GameSummary gameId={gameId} endGame={true} />;
}

export default EndGame;
