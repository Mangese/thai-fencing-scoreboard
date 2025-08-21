import React from 'react';
import { PLAYERS } from '../../utils/constants.js';
import TeamLogo from '../common/TeamLogo.js';
import PlayerName from '../common/PlayerName.js';
import Score from '../common/Score.js';
import Timer from '../common/Timer.js';
import WarningIcons from '../common/WarningIcons.js';
import CompetitionLogo from './CompetitionLogo.js';

// NOTE: This is a placeholder for the new small timer at the bottom.
// You'll need to create this component and pass the correct data to it.
const SpecialTimer = ({ timeLeft }) => {
  const timerStyle = {
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    color: '#333',
    backgroundColor: '#fff',
    border: '2px solid #ddd',
    borderRadius: '0.5rem',
    padding: '0.25rem 1.5rem',
  };
  // A simple formatter for the special timer
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };
  return <div style={timerStyle}>{formatTime(timeLeft)}</div>;
};


const DisplayScreen = ({ gameState, getPlayerData }) => {
  const player1 = getPlayerData(PLAYERS.PLAYER1);
  const player2 = getPlayerData(PLAYERS.PLAYER2);

  // Main container using CSS Grid
  const containerStyle = {
    height: '100vh',
    width: '100vw',
    backgroundColor: '#fff',
    display: 'grid',
    // Defines 3 columns: side columns are 3 parts, center is 4 parts
    gridTemplateColumns: '3fr 4fr 3fr',
    // Defines 3 rows: top is 2 parts, middle (scores) is 3, bottom is 1
    gridTemplateRows: '2fr 3fr 1fr',
    fontFamily: '"Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '1rem',
    gap: '1rem',
  };

  // A generic style to center content within any grid cell
  const cellStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  };

  return (
      <div style={containerStyle}>
        {/* -- TOP ROW -- */}
        {/* Player 1 Section (Logo + Name) */}
        <div style={cellStyle}>
            <TeamLogo logoData={gameState.logo[PLAYERS.PLAYER1]} size="clamp(8rem, 8vh, 10rem)" />
          <PlayerName
              name={gameState.name[PLAYERS.PLAYER1]}
              fontSize="clamp(4rem, 5vw, 6rem)"
              color="#333"
          />
        </div>

        {/* Main Timer Section */}
        <div style={cellStyle}>
          <Timer
              timeLeft={gameState.timer.timeLeft}
              timerState={gameState.timer.state}
              isExtended={gameState.timer.isExtended}
              fontSize="clamp(6rem, 15vw, 10rem)"
              color="#000000"
          />
        </div>

        {/* Player 2 Section (Logo + Name) */}
        <div style={cellStyle}>
          <TeamLogo logoData={gameState.logo[PLAYERS.PLAYER2]} size="clamp(8rem, 8vh, 10rem)" />
          <PlayerName
              name={gameState.name[PLAYERS.PLAYER2]}
              fontSize="clamp(4rem, 5vw, 6rem)"
              color="#333"
          />
        </div>

        {/* -- MIDDLE ROW -- */}
        {/* Player 1 Score */}
        <div style={cellStyle}>
          <Score
              score={player1.score}
              playerId={PLAYERS.PLAYER1}
              fontSize="clamp(12rem, 30vw, 22rem)"
              isWinner={gameState.winner === PLAYERS.PLAYER1}
          />
        </div>

        {/* Main Logo */}
        <div style={cellStyle}>
          <CompetitionLogo maxWidth="clamp(200px, 20vw, 350px)" />
        </div>

        {/* Player 2 Score */}
        <div style={cellStyle}>
          <Score
              score={player2.score}
              playerId={PLAYERS.PLAYER2}
              fontSize="clamp(12rem, 30vw, 22rem)"
              isWinner={gameState.winner === PLAYERS.PLAYER2}
          />
        </div>

        {/* -- BOTTOM ROW -- */}
        {/* Player 1 Warnings */}
        <div style={cellStyle}>
          <WarningIcons
              activeColor="#d9534f"
              warnings={player1.warnings}
              size="clamp(1rem, 6vw, 12rem)"
          />
        </div>

        {/* Special Timer */}
        <div style={cellStyle}>
          {/*
          NOTE: This is a placeholder. You need to provide the time
          from your gameState, for example: gameState.specialTimer.timeLeft
        */}
          <SpecialTimer timeLeft={gameState.subTimer.timeLeft} />
        </div>

        {/* Player 2 Warnings */}
        <div style={cellStyle}>
          <WarningIcons
              activeColor="#1d00fe"
              warnings={player2.warnings}
              size="clamp(1rem, 6vw, 12rem)"
          />
        </div>
      </div>
  );
};

export default DisplayScreen;