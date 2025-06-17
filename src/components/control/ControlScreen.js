import React from 'react';
import { PLAYERS } from '../../utils/constants.js';
import MatchSummary from './MatchSummary.js';
import PlayerControls from './PlayerControls.js';
import GlobalControls from './GlobalControls.js';

const ControlScreen = ({
                         gameState,
                         setGameState,
                         getPlayerData,
                         handleAddPoint,
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

  const containerStyle = {
    height: '100vh',
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
    height: '120px'
  };

  const playerControlStyle = {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    padding: '1rem'
  };

  const globalControlsContainerStyle = {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
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
            onAddWarning={handleAddWarning}
            disabled={isMatchOver}
          />
        </div>

        {/* Player 2 Controls */}
        <div style={playerControlStyle}>
          <PlayerControls
            playerId={PLAYERS.PLAYER2}
            playerData={player2}
            onAddPoint={handleAddPoint}
            onAddWarning={handleAddWarning}
            disabled={isMatchOver}
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
