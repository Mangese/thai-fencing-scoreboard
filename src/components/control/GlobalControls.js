import React from 'react';
import { TIMER_STATES, SCREEN_TYPES } from '../../utils/constants.js';
import { useTimer } from '../../hooks/useTimer.js';

const GlobalControls = ({
                          gameState,
                          setGameState,
                          handleStartTimer,
                          handlePauseTimer,
                          handleResetTimer,
                          handleExtendTimer,
                          setCurrentScreen,
                          resetGame
                        }) => {
  const { shouldShowExtension, isRunning, canStart } = useTimer(gameState, setGameState);

  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '0.5rem',
    gridAutoRows: 'minmax(4.3rem, auto)'
  };

  const buttonStyle = {
    padding: '0',
    border: 'none',
    borderRadius: '0.5rem',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.25rem',
    minHeight: '4.3rem'
  };

  const timerButtonStyle = {
    ...buttonStyle,
    backgroundColor: isRunning ? '#dc3545' : '#28a745',
    color: 'white'
  };

  const resetButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#6c757d',
    color: 'white'
  };

  const extendButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#007bff',
    color: 'white',
    gridColumn: 'span 3'
  };

  const navigationButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#17a2b8',
    color: 'white'
  };

  const dangerButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#dc3545',
    color: 'white'
  };

  const iconStyle = {
    fontSize: '1.5rem'
  };

  const labelStyle = {
    fontSize: '0.9rem',
    textAlign: 'center',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: '100%'
  };

  return (
    <div style={containerStyle}>
      {/* Timer Start/Pause Button */}
      <button
        style={timerButtonStyle}
        onClick={isRunning ? handlePauseTimer : handleStartTimer}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = isRunning ? '#c82333' : '#218838';
          e.target.style.transform = 'scale(1.02)';
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = isRunning ? '#dc3545' : '#28a745';
          e.target.style.transform = 'scale(1)';
        }}
        disabled={!canStart && !isRunning}
      >
        <div style={iconStyle}>{isRunning ? '⏸️' : '▶️'}</div>
        <div style={labelStyle}>{isRunning ? 'PAUSE' : 'START'}</div>
      </button>

      {/* Reset Timer Button */}
      <button
        style={resetButtonStyle}
        onClick={handleResetTimer}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = '#5a6268';
          e.target.style.transform = 'scale(1.02)';
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = '#6c757d';
          e.target.style.transform = 'scale(1)';
        }}
      >
        <div style={iconStyle}>🔄</div>
        <div style={labelStyle}>RESET TIME</div>
      </button>

      {/* Logs Button */}
      <button
        style={navigationButtonStyle}
        onClick={() => setCurrentScreen(SCREEN_TYPES.LOGS)}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = '#138496';
          e.target.style.transform = 'scale(1.02)';
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = '#17a2b8';
          e.target.style.transform = 'scale(1)';
        }}
      >
        <div style={iconStyle}>📋</div>
        <div style={labelStyle}>LOGS</div>
      </button>

      {/* Extend Timer Button (only show when needed) */}
      {shouldShowExtension && (
        <button
          style={extendButtonStyle}
          onClick={handleExtendTimer}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#0056b3';
            e.target.style.transform = 'scale(1.02)';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#007bff';
            e.target.style.transform = 'scale(1)';
          }}
        >
          <div style={iconStyle}>⏰</div>
          <div style={labelStyle}>EXTEND +1:00 MIN</div>
        </button>
      )}

      {/* Second Row - when no extension needed */}
      {!shouldShowExtension && (
        <>
          {/* Summary/Results Button */}
          <button
            style={navigationButtonStyle}
            onClick={() => setCurrentScreen(SCREEN_TYPES.SUMMARY)}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#138496';
              e.target.style.transform = 'scale(1.02)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#17a2b8';
              e.target.style.transform = 'scale(1)';
            }}
          >
            <div style={iconStyle}>📊</div>
            <div style={labelStyle}>SUMMARY</div>
          </button>

          {/* New Match Button */}
          <button
            style={dangerButtonStyle}
            onClick={() => {
              if (window.confirm('Start new match? This will reset all scores and timer.')) {
                resetGame();
              }
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#c82333';
              e.target.style.transform = 'scale(1.02)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#dc3545';
              e.target.style.transform = 'scale(1)';
            }}
          >
            <div style={iconStyle}>🆕</div>
            <div style={labelStyle}>NEW MATCH</div>
          </button>

          {/* Setup Button */}
          <button
            style={navigationButtonStyle}
            onClick={() => setCurrentScreen(SCREEN_TYPES.SETUP)}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#138496';
              e.target.style.transform = 'scale(1.02)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#17a2b8';
              e.target.style.transform = 'scale(1)';
            }}
          >
            <div style={iconStyle}>⚙️</div>
            <div style={labelStyle}>SETUP</div>
          </button>
        </>
      )}
    </div>
  );
};

export default GlobalControls;
