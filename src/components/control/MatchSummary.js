import React from 'react';
import { PLAYERS } from '../../utils/constants.js';
import { formatTime } from '../../utils/gameLogic.js';
import Timer from '../common/Timer.js';
import WarningIcons from '../common/WarningIcons.js';

const MatchSummary = ({ gameState, getPlayerData }) => {
  const player1 = getPlayerData(PLAYERS.PLAYER1);
  const player2 = getPlayerData(PLAYERS.PLAYER2);

  const containerStyle = {
    backgroundColor: '#fff',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '1rem'
  };

  const headerStyle = {
    textAlign: 'center',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '1rem',
    borderBottom: '2px solid #eee',
    paddingBottom: '0.5rem'
  };

  const summaryGridStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr',
    gap: '1rem',
    alignItems: 'center'
  };

  const playerSummaryStyle = {
    textAlign: 'center',
    padding: '0.5rem'
  };

  const playerNameStyle = {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem'
  };

  const player1NameStyle = {
    ...playerNameStyle,
    color: '#FF4444'
  };

  const player2NameStyle = {
    ...playerNameStyle,
    color: '#4444FF'
  };

  const scoreStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem'
  };

  const player1ScoreStyle = {
    ...scoreStyle,
    color: '#FF4444'
  };

  const player2ScoreStyle = {
    ...scoreStyle,
    color: '#4444FF'
  };

  const warningsLabelStyle = {
    fontSize: '0.9rem',
    color: '#666',
    marginBottom: '0.25rem'
  };

  const timerContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0 1rem'
  };

  const statusStyle = {
    fontSize: '0.9rem',
    color: '#666',
    marginTop: '0.5rem',
    textAlign: 'center'
  };

  const winnerStyle = {
    backgroundColor: '#d4edda',
    border: '1px solid #c3e6cb',
    borderRadius: '5px',
    padding: '0.5rem',
    color: '#155724',
    textAlign: 'center',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    marginBottom: '1rem'
  };

  return (
    <div style={containerStyle}>
      <h3 style={headerStyle}>Match Status</h3>

      {gameState.winner && (
        <div style={winnerStyle}>
          🏆 Winner: {gameState.winner === PLAYERS.PLAYER1 ? player1.name :
          gameState.winner === PLAYERS.PLAYER2 ? player2.name : 'Draw'}
        </div>
      )}

      <div style={summaryGridStyle}>
        {/* Player 1 Summary */}
        <div style={playerSummaryStyle}>
          <div style={player1NameStyle}>{player1.name}</div>
          <div style={player1ScoreStyle}>{player1.score}</div>
          <div style={warningsLabelStyle}>Warnings:</div>
          <WarningIcons warnings={player1.warnings} size="1.5rem" />
        </div>

        {/* Timer */}
        <div style={timerContainerStyle}>
          <Timer
            timeLeft={gameState.timer.timeLeft}
            timerState={gameState.timer.state}
            isExtended={gameState.timer.isExtended}
            fontSize="2.5rem"
          />
        </div>

        {/* Player 2 Summary */}
        <div style={playerSummaryStyle}>
          <div style={player2NameStyle}>{player2.name}</div>
          <div style={player2ScoreStyle}>{player2.score}</div>
          <div style={warningsLabelStyle}>Warnings:</div>
          <WarningIcons warnings={player2.warnings} size="1.5rem" />
        </div>
      </div>

      <div style={statusStyle}>
        {gameState.winner ? 'Match Completed' : 'Match in Progress'}
      </div>
    </div>
  );
};

export default MatchSummary;
