import React from 'react';
import { WARNING_TYPES, WARNING_DISPLAY } from '../../utils/constants.js';

const WarningIcons = ({
                        warnings,
                        size = '2rem',
                        className = '',
                        showCount = true
                      }) => {
  const containerStyle = {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap'
  };

  const warningStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    fontSize: size,
    opacity: 0.7
  };

  const activeWarningStyle = {
    ...warningStyle,
    opacity: 1,
    filter: 'drop-shadow(0 0 5px rgba(0,0,0,0.3))'
  };

  const countStyle = {
    fontSize: size === '2rem' ? '1rem' : '0.8rem',
    fontWeight: 'bold',
    color: '#333',
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: '50%',
    width: '1.5em',
    height: '1.5em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '1.5em'
  };

  return (
    <div className={`warning-icons ${className}`} style={containerStyle}>
      {Object.entries(WARNING_TYPES).map(([key, warningType]) => {
        const warningCount = warnings[warningType] || 0;
        const config = WARNING_DISPLAY[warningType];
        const isActive = warningCount > 0;

        return (
          <div
            key={warningType}
            style={isActive ? activeWarningStyle : warningStyle}
            title={`${config.label}: ${warningCount}`}
          >
            <span>{config.icon}</span>
            {showCount && (
              <span style={countStyle}>
                {warningCount}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default WarningIcons;
