import React from 'react';

const PlayerName = ({
                      name,
                      fontSize = '5rem',
                      className = '',
                      color = '#333',
                      textAlign = 'center'
                    }) => {
  const nameStyle = {
    fontSize,
    fontWeight: 'bold',
    color,
    textAlign,
    margin: '0.5rem 0',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    maxWidth: '100%'
  };

  return (
    <div className={`player-name ${className}`} style={nameStyle}>
      {name}
    </div>
  );
};

export default PlayerName;
