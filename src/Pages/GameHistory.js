import React from 'react';
import { useParams } from 'react-router-dom';
import GameSummary from '../components/GameSummary';

function GameHistory() {
    const { gameId } = useParams();
    return <GameSummary gameId={gameId} endGame={false} />;
}

export default GameHistory;
