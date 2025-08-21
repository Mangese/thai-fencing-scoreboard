import React from 'react';
import { WARNING_TYPES, WARNING_DISPLAY, PLAYERS } from '../../utils/constants.js';

const PlayerControls = ({
                          playerId,
                          playerData,
                          onAddPoint,
                          onSubtractPoint,
                          onAddWarning,
                          disabled = false
                        }) => {
  const isPlayer1 = playerId === PLAYERS.PLAYER1;

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    // height: '100%',
    gap: '0.5rem'
  };

  const headerStyle = {
    textAlign: 'center',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: isPlayer1 ? '#FF4444' : '#4444FF',
    padding: '1rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '0.5rem',
    marginBottom: '0.5rem'
  };

  const buttonGroupStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr auto',
    gap: '0.5rem',
    flex: 1
  };

  const pointRowStyle = {
    display: 'flex',
    gridRow: '1',
    gap: '0.5rem' // Add this to space out the buttons
  };



  const warningsRowStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '0.5rem',
    gridRow: '2'
  };

  const buttonStyle = {
    flex: 1,
    padding: '0',
    border: 'none',
    borderRadius: '0.5rem',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    opacity: disabled ? 0.5 : 1,
    minHeight: '5rem'
  };
  const subtractPointButtonStyle = { // Add this new style object
    ...buttonStyle,
    backgroundColor: '#dc3545',
    color: 'white',
    fontSize: 'clamp(1rem, 4vw, 1.4rem)'
  };
  const pointButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#28a745',
    color: 'white',
    fontSize: 'clamp(1rem, 4vw, 1.4rem)'
  };

  const warningButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#ffc107',
    color: '#333',
    fontSize: 'clamp(1rem, 4vw, 1.4rem)'
  };

  const outWarningButtonStyle = {
    ...warningButtonStyle,
    backgroundColor: '#ff6b6b'
  };

  const weaponWarningButtonStyle = {
    ...warningButtonStyle,
    backgroundColor: '#ff8c42'
  };

  const generalWarningButtonStyle = {
    ...warningButtonStyle,
    backgroundColor: '#9c27b0',
    color: 'white'
  };

  const countStyle = {
    fontSize: 'clamp(0.5rem, 4vw, 1rem)',
    opacity: 0.8
  };

  const handleButtonClick = (callback) => {
    if (!disabled) {
      callback();
    }
  };

  const getWarningCount = (warningType) => {
    return playerData.warnings[warningType] || 0;
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        {playerData.name}
        <div style={{ fontSize: 'clamp(0.5rem, 4vw, 1rem)' , marginTop: '0.5rem', opacity: 0.8 }}>
          Score: {playerData.score}
        </div>
      </div>

      <div style={buttonGroupStyle}>
        {/* Top Row - Add Point Button */}
        <div style={pointRowStyle}>
          <button
              style={subtractPointButtonStyle}
              onClick={() => handleButtonClick(() => onSubtractPoint(playerId))}
              onMouseOver={(e) => {
                if (!disabled) e.target.style.backgroundColor = '#c82333';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#dc3545';
              }}
              disabled={disabled || playerData.score === 0} // Also disable if score is 0
          >
            <div>-1 แต้ม</div>
          </button>
          <button
            style={pointButtonStyle}
            onClick={() => handleButtonClick(() => onAddPoint(playerId))}
            onMouseOver={(e) => {
              if (!disabled) {
                e.target.style.backgroundColor = '#218838';
                e.target.style.transform = 'scale(1.02)';
              }
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#28a745';
              e.target.style.transform = 'scale(1)';
            }}
            disabled={disabled}
          >
            <div>+1 แต้ม</div>
          </button>
        </div>

        {/* Bottom Row - Warning Buttons */}
        <div style={warningsRowStyle}>
          {/* Out of Bounds Warning */}
          <button
            style={outWarningButtonStyle}
            onClick={() => handleButtonClick(() => onAddWarning(playerId, WARNING_TYPES.OUT_OF_BOUNDS))}
            onMouseOver={(e) => {
              if (!disabled) {
                e.target.style.backgroundColor = '#ff5252';
                e.target.style.transform = 'scale(1.02)';
              }
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#ff6b6b';
              e.target.style.transform = 'scale(1)';
            }}
            disabled={disabled}
          >
            <div>ออกนอกวง</div>
          </button>

          {/* Weapon Warning */}
          <button
            style={weaponWarningButtonStyle}
            onClick={() => handleButtonClick(() => onAddWarning(playerId, WARNING_TYPES.WEAPON_NOT_IN_HAND))}
            onMouseOver={(e) => {
              if (!disabled) {
                e.target.style.backgroundColor = '#ff7043';
                e.target.style.transform = 'scale(1.02)';
              }
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#ff8c42';
              e.target.style.transform = 'scale(1)';
            }}
            disabled={disabled}
          >
            <div>ดาบหลุดมือ</div>
          </button>

          {/* General Warning */}
          <button
            style={generalWarningButtonStyle}
            onClick={() => handleButtonClick(() => onAddWarning(playerId, WARNING_TYPES.GENERAL_WARNING))}
            onMouseOver={(e) => {
              if (!disabled) {
                e.target.style.backgroundColor = '#7b1fa2';
                e.target.style.transform = 'scale(1.02)';
              }
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#9c27b0';
              e.target.style.transform = 'scale(1)';
            }}
            disabled={disabled}
          >
            <div>เตือน</div>
            <div style={countStyle}>
              {WARNING_DISPLAY[WARNING_TYPES.GENERAL_WARNING].icon}
              ({getWarningCount(WARNING_TYPES.GENERAL_WARNING)})
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerControls;
