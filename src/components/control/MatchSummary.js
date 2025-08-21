import React from 'react';
import {PLAYERS, TIMER_STATES} from '../../utils/constants.js';
import WarningIcons from '../common/WarningIcons.js';
import TimerControls from './TimerControl.js'; // Import the new component

const MatchSummary = ({
                        gameState,
                        getPlayerData,
                        handleStartTimer, // Add new prop
                        handlePauseTimer, // Add new prop
                        handleSetTime     // Add new prop
                      }) => {
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

  const player1NameStyle = { ...playerNameStyle, color: '#FF4444' };
  const player2NameStyle = { ...playerNameStyle, color: '#4444FF' };

  const scoreStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem'
  };

  const player1ScoreStyle = { ...scoreStyle, color: '#FF4444' };
  const player2ScoreStyle = { ...scoreStyle, color: '#4444FF' };

  const warningsLabelStyle = {
    fontSize: '0.9rem',
    color: '#666',
    marginBottom: '0.25rem'
  };

  // Updated style for the new timer section layout
  const timerSectionStyle = {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto',
    alignItems: 'center',
    gap: '1rem',
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
              🏆 Winner: {gameState.winner === PLAYERS.PLAYER1 ? player1.name : player2.name}
            </div>
        )}

        <div style={summaryGridStyle}>
          {/* Player 1 Summary */}
          <div style={playerSummaryStyle}>
            <div style={player1NameStyle}>{player1.name}</div>
            <div style={player1ScoreStyle}>{player1.score}</div>
            <div style={warningsLabelStyle}>Warnings:</div>
            <WarningIcons activeColor="#d9534f" warnings={player1.warnings} size="3rem" />
          </div>

          {/* NEW TIMER SECTION */}
          <div style={timerSectionStyle}>
            <TimerControls
                handleSetTime={handleSetTime}
                handleStartTimer={handleStartTimer}
                handlePauseTimer={handlePauseTimer}
                timerState={gameState.timer.state}
                timeLeft={gameState.timer.timeLeft}
                isExtended={gameState.timer.isExtended}
                timerId="main"
                disabled={gameState.subTimer.state === TIMER_STATES.RUNNING}
            />
            <TimerControls
                handleSetTime={handleSetTime}
                handleStartTimer={handleStartTimer}
                handlePauseTimer={handlePauseTimer}
                timerState={gameState.subTimer.state}
                timeLeft={gameState.subTimer.timeLeft}
                isExtended={gameState.subTimer.isExtended}
                disabled={gameState.timer.state === TIMER_STATES.RUNNING}
                timerId="sub"
            />
          </div>

          {/* Player 2 Summary */}
          <div style={playerSummaryStyle}>
            <div style={player2NameStyle}>{player2.name}</div>
            <div style={player2ScoreStyle}>{player2.score}</div>
            <div style={warningsLabelStyle}>Warnings:</div>
            <WarningIcons activeColor="#1d00fe" warnings={player2.warnings} size="3rem" />
          </div>
        </div>

        <div style={statusStyle}>
          {gameState.winner ? 'Match Completed' : 'Match in Progress'}
        </div>
      </div>
  );
};

export default MatchSummary;
