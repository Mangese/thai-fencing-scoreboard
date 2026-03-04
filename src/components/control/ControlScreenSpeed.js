import React from 'react';
import { PLAYERS, TIMER_STATES } from '../../utils/constants.js';
import MatchSummary from './MatchSummary.js';
import PlayerControls from './PlayerControls.js';
import GlobalControls from './GlobalControls.js';
import { useTimer } from '../../hooks/useTimer.js';

// Control screen specifically for Speed mode.
// Kept separate from the normal ControlScreen to minimize impact on existing code.
const ControlScreenSpeed = ({
  gameState,
  setGameState,
  getPlayerData,
  handleAddPoint,
  handleSubtractPoint,
  handleAddWarning,
  handleStartTimer,
  handlePauseTimer,
  handleSetTime,
  handleResetTimer,
  handleExtendTimer,
  setCurrentScreen,
  resetGame
}) => {
  const player1 = getPlayerData(PLAYERS.PLAYER1);
  const player2 = getPlayerData(PLAYERS.PLAYER2);

  const { isRunning, shouldShowExtension } = useTimer(gameState, setGameState);

  const isMatchOver = gameState.winner !== null;
  const isMatchRunning = gameState.timer.state === TIMER_STATES.RUNNING;

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
    display: 'grid',
    gridTemplateRows: 'auto auto 1fr auto',
    padding: '1rem',
    gap: '1rem',
    fontFamily: 'Arial, sans-serif'
  };

  const summaryStyle = { gridRow: '1' };
  const playerControlsContainerStyle = {
    gridRow: '3',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
    minHeight: '0'
  };
  const globalControlsStyle = { gridRow: '4' };

  const playerControlStyle = {
    backgroundColor: '#fff',
    borderRadius: '0.5rem',
    boxShadow: '0 0.125rem 0.25rem rgba(0,0,0,0.1)',
    padding: '1rem'
  };

  return (
    <div style={containerStyle}>
      <div style={summaryStyle}>
        <MatchSummary
          handleStartTimer={handleStartTimer}
          handlePauseTimer={handlePauseTimer}
          handleSetTime={handleSetTime}
          gameState={gameState}
          getPlayerData={getPlayerData}
        />
      </div>

      <div style={playerControlsContainerStyle}>
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

      <div style={globalControlsStyle}>
        <GlobalControls
          shouldShowExtension={shouldShowExtension}
          handleResetTimer={handleResetTimer}
          handleExtendTimer={handleExtendTimer}
          setCurrentScreen={setCurrentScreen}
          resetGame={resetGame}
        />
      </div>
    </div>
  );
};

export default ControlScreenSpeed;

