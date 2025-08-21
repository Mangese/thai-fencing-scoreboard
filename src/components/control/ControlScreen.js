import React from 'react';
import { PLAYERS, TIMER_STATES } from '../../utils/constants.js';
import MatchSummary from './MatchSummary.js';
import PlayerControls from './PlayerControls.js';
import GlobalControls from './GlobalControls.js';
import { useTimer } from '../../hooks/useTimer.js'; // Hook is now used here

const ControlScreen = ({
                           gameState,
                           setGameState, // Pass this to useTimer
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

    // useTimer hook now lives in the parent to control the main button
    // and pass down `shouldShowExtension` to the modal
    const { isRunning, canStart, shouldShowExtension } = useTimer(gameState, setGameState);

    const isMatchOver = gameState.winner !== null;
    const isMatchRunning = gameState.timer.state === TIMER_STATES.RUNNING;

    // Updated 4-row layout
    const containerStyle = {
        'minHeight': '100vh',
        backgroundColor: '#f8f9fa',
        display: 'grid',
        gridTemplateRows: 'auto auto 1fr auto',
        padding: '1rem',
        gap: '1rem',
        fontFamily: 'Arial, sans-serif'
    };

    const summaryStyle = { gridRow: '1' };
    const timerControlsStyle = { gridRow: '2' };
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

    // Style for the new, prominent Start/Pause button
    const startPauseButtonStyle = {
        width: '100%',
        padding: '1.2rem',
        border: 'none',
        borderRadius: '0.5rem',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
        backgroundColor: isRunning ? '#dc3545' : '#28a745',
        color: 'white',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    };

    return (
        <div style={containerStyle}>
            {/* Row 1: Match Summary */}
            <div style={summaryStyle}>
                <MatchSummary handleStartTimer={handleStartTimer} handlePauseTimer={handlePauseTimer} handleSetTime={handleSetTime} gameState={gameState} getPlayerData={getPlayerData} />
            </div>

            {/* Row 3: Player Controls */}
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

            {/* Row 4: Global Controls (which now just opens the modal) */}
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

export default ControlScreen;
