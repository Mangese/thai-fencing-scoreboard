import React from 'react';
import {PLAYERS, TIMER_STATES} from '../../utils/constants.js';
import MatchSummary from './MatchSummary.js';
import PlayerControls from './PlayerControls.js';
import GlobalControls from './GlobalControls.js';

const ControlScreen = ({
                         gameState,
                         setGameState,
                         getPlayerData,
                         handleAddPoint,
                         handleSubtractPoint,
                         handleAddWarning,
                         handleStartTimer,
                         handlePauseTimer,
                         handleResetTimer,
                         handleExtendTimer,
                         setCurrentScreen,
                         resetGame
                       }) => {
  const player1 = getPlayerData(PLAYERS.PLAYER1);
  const player2 = getPlayerData(PLAYERS.PLAYER2);

  // Check if match is over
  const isMatchOver = gameState.winner !== null;
  const isMatchRunning = gameState.timer.state !== TIMER_STATES.PAUSED;

  console.log(isMatchOver, isMatchRunning)
  const containerStyle = {
    'min-height': '100vh', // Change 'height' to 'min-height'
    backgroundColor: '#f8f9fa',
    display: 'grid',
    gridTemplateRows: 'auto 1fr auto',
    padding: '1rem',
    gap: '1rem',
    fontFamily: 'Arial, sans-serif'
  };

  const summaryStyle = {
    gridRow: '1'
  };

  const controlsStyle = {
    gridRow: '2',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
    minHeight: '0'
  };

  const globalControlsStyle = {
    gridRow: '3',
    minHeight: '7.5rem'
  };

  const playerControlStyle = {
    backgroundColor: '#fff',
    borderRadius: '0.5rem',
    boxShadow: '0 0.125rem 0.25rem rgba(0,0,0,0.1)',
    padding: '1rem'
  };

  const globalControlsContainerStyle = {
    backgroundColor: '#fff',
    borderRadius: '0.5rem',
    boxShadow: '0 0.125rem 0.25rem rgba(0,0,0,0.1)',
    padding: '1rem'
  };

  const headerStyle = {
    textAlign: 'center',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '1rem'
  };

  return (
    <div style={containerStyle}>
      {/* Match Summary Section */}
      <div style={summaryStyle}>
        <MatchSummary
          gameState={gameState}
          getPlayerData={getPlayerData}
        />
      </div>

      {/* Player Controls Section */}
      <div style={controlsStyle}>
        {/* Player 1 Controls */}
        <div style={playerControlStyle}>
          <PlayerControls
            playerId={PLAYERS.PLAYER1}
            playerData={player1}
            onAddPoint={handleAddPoint}
            onSubtractPoint={handleSubtractPoint}
            onAddWarning={handleAddWarning}
            disabled={isMatchOver || isMatchRunning}
          />
        </div>

        {/* Player 2 Controls */}
        <div style={playerControlStyle}>
          <PlayerControls
            playerId={PLAYERS.PLAYER2}
            playerData={player2}
            onAddPoint={handleAddPoint}
            onSubtractPoint={handleSubtractPoint}
            onAddWarning={handleAddWarning}
            disabled={isMatchOver || isMatchRunning}
          />
        </div>
      </div>

      {/* Global Controls Section */}
      <div style={globalControlsStyle}>
        <div style={globalControlsContainerStyle}>
          <div style={headerStyle}>Match Controls</div>
          <GlobalControls
            gameState={gameState}
            setGameState={setGameState}
            handleStartTimer={handleStartTimer}
            handlePauseTimer={handlePauseTimer}
            handleResetTimer={handleResetTimer}
            handleExtendTimer={handleExtendTimer}
            setCurrentScreen={setCurrentScreen}
            resetGame={resetGame}
          />
        </div>
      </div>
    </div>
  );
};

export default ControlScreen;
