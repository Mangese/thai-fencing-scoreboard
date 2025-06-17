import React from 'react';
import { PLAYERS } from '../../utils/constants.js';

const Score = ({
                 score,
                 playerId,
                 fontSize = '12rem',
                 className = '',
                 isWinner = false
               }) => {
  const getScoreColor = () => {
    if (isWinner) {
      return '#FFD700'; // Gold for winner
    }
    return playerId === PLAYERS.PLAYER1 ? '#FF4444' : '#4444FF';
  };

  const scoreStyle = {
    fontSize,
    fontWeight: 'bold',
    color: getScoreColor(),
    textAlign: 'center',
    margin: '1rem 0',
    textShadow: isWinner ? '0 0 20px rgba(255, 215, 0, 0.5)' : 'none',
    transition: 'all 0.3s ease'
  };

  return (
    <div className={`score ${className}`} style={scoreStyle}>
      {score}
    </div>
  );
};

export default Score;
