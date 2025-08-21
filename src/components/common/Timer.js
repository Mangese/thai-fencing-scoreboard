import React from 'react';
import { formatTime } from '../../utils/gameLogic.js';
import { TIMER_STATES, GAME_CONFIG } from '../../utils/constants.js';

const Timer = ({
                 timeLeft,
                 timerState,
                 isExtended = false,
                 fontSize = '4rem',
                 className = ''
               }) => {
  const getTimerColor = () => {
    // Red when time is critical
    if (timeLeft <= 30 && timerState === TIMER_STATES.RUNNING) {
      return '#FF4444';
    }
    // Orange when approaching 1 minute
    if (timeLeft <= GAME_CONFIG.AUDIO_ALERT_TIME && !isExtended) {
      return '#FF8800';
    }
    // Blue for extended time
    if (isExtended) {
      return '#4444FF';
    }
    // Default green
    return '#44AA44';
  };

  const getTimerBackground = () => {
    if (timerState === TIMER_STATES.ENDED) {
      return '#FFE6E6'; // Light red background when ended
    }
    if (timerState === TIMER_STATES.PAUSED) {
      return 'transparent'; // Light yellow background when paused
    }
    return 'transparent';
  };

  const timerStyle = {
    fontSize,
    fontWeight: 'bold',
    color: getTimerColor(),
    backgroundColor: getTimerBackground(),
    textAlign: 'center',
    padding: '0.5rem 1rem',
    borderRadius: '10px',
    fontFamily: 'monospace',
    border: timerState === TIMER_STATES.ENDED ? '3px solid #FF4444' : 'none',
    transition: 'all 0.3s ease',
    minWidth: '200px'
  };

  const statusStyle = {
    fontSize: fontSize === '4rem' ? '1rem' : '0.8rem',
    color: '#666',
    marginTop: '0.5rem',
    textTransform: 'uppercase',
    letterSpacing: '2px'
  };

  const getStatusText = () => {
    return '';
  };

  return (
    <div className={`timer ${className}`}>
      <div style={timerStyle}>
        {formatTime(timeLeft)}
      </div>
      {getStatusText() && (
        <div style={statusStyle}>
          {getStatusText()}
        </div>
      )}
    </div>
  );
};

export default Timer;
