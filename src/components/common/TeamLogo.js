import React from 'react';
import { DEFAULTS } from '../../utils/constants.js';

const TeamLogo = ({
                    logoData,
                    size = '120px',
                    className = '',
                    showBorder = true
                  }) => {
  const logoStyle = {
    width: size,
    height: size,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: size === '120px' ? '1.5rem' : '1rem',
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0',
    border: showBorder ? '3px solid #ddd' : 'none',
    overflow: 'hidden'
  };

  return (
    <div className={`team-logo ${className}`} style={logoStyle}>
      {logoData ? (
        <img
          src={logoData}
          alt="Team Logo"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      ) : (
        <span style={{ color: '#666' }}>
          {DEFAULTS.TEAM_LOGO_TEXT}
        </span>
      )}
    </div>
  );
};

export default TeamLogo;
