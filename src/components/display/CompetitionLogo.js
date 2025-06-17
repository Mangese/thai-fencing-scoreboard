import React from 'react';

const CompetitionLogo = ({
                           src = '/logo.jpg',
                           alt = 'Competition Logo',
                           maxWidth = '300px',
                           className = ''
                         }) => {
  const logoStyle = {
    maxWidth,
    maxHeight: '200px',
    width: 'auto',
    height: 'auto',
    objectFit: 'contain',
    margin: '1rem auto',
    display: 'block'
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem'
  };

  return (
    <div className={`competition-logo-container ${className}`} style={containerStyle}>
      <img
        src={src}
        alt={alt}
        style={logoStyle}
        onError={(e) => {
          // Hide image if it fails to load
          e.target.style.display = 'none';
        }}
      />
    </div>
  );
};

export default CompetitionLogo;
