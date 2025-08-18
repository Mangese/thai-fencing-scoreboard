import React, { useState } from 'react';
import { PLAYERS, DEFAULTS } from '../../utils/constants.js';
import LogoUpload from './LogoUpload.js';

const SetupScreen = ({
                       playerNames,
                       teamLogos,
                       updatePlayerName,
                       updateTeamLogo,
                       startNewMatch
                     }) => {
  const [localNames, setLocalNames] = useState({
    player1: playerNames.player1 || '',
    player2: playerNames.player2 || ''
  });

  const handleNameChange = (playerId, value) => {
    const playerKey = playerId.toLowerCase();
    setLocalNames(prev => ({
      ...prev,
      [playerKey]: value
    }));
    updatePlayerName(playerId, value);
  };

  const handleStartMatch = () => {
    // Validate that names are entered
    if (!localNames.player1.trim() || !localNames.player2.trim()) {
      alert('Please enter names for both players');
      return;
    }

    startNewMatch();
  };

  const containerStyle = {
    // height: '100vh',
    backgroundColor: '#f8f9fa',
    display: 'flex',
    flexDirection: 'column',
    // padding: '5rem',
    fontFamily: 'Arial, sans-serif'
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '2rem'
  };

  const titleStyle = {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '0.5rem'
  };

  const subtitleStyle = {
    fontSize: '1.2rem',
    color: '#666'
  };

  const contentStyle = {
    flex: 1,
    display: 'flex',
    gap: '3rem',
    justifyContent: 'center',
    alignItems: 'flex-start',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%'
  };

  const playerSectionStyle = {
    flex: 1,
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '15px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  };

  const inputGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  };

  const labelStyle = {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#333'
  };

  const inputStyle = {
    padding: '1rem',
    fontSize: '1.2rem',
    border: '2px solid #ddd',
    borderRadius: '8px',
    outline: 'none',
    transition: 'border-color 0.3s ease'
  };

  const inputFocusStyle = {
    borderColor: '#007bff'
  };

  const startButtonStyle = {
    alignSelf: 'center',
    padding: '1.5rem 3rem',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    marginBottom: '2rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  };

  const startButtonHoverStyle = {
    backgroundColor: '#218838',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 8px rgba(0,0,0,0.15)'
  };

  const playerHeaderStyle = {
    textAlign: 'center',
    fontSize: '1.8rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    paddingBottom: '1rem',
    borderBottom: '2px solid #eee'
  };

  const player1HeaderStyle = {
    ...playerHeaderStyle,
    color: '#FF4444'
  };

  const player2HeaderStyle = {
    ...playerHeaderStyle,
    color: '#4444FF'
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Thai Fencing Scoreboard</h1>
        <p style={subtitleStyle}>Setup Match - Enter Player Information</p>
      </div>
      <button
          style={startButtonStyle}
          onClick={handleStartMatch}
          onMouseOver={(e) => Object.assign(e.target.style, startButtonHoverStyle)}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#28a745';
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
          }}
          disabled={!localNames.player1.trim() || !localNames.player2.trim()}
      >
        Start Match
      </button>
      <div style={contentStyle}>
        {/* Player 1 Setup */}
        <div style={playerSectionStyle}>
          <h2 style={player1HeaderStyle}>ฝ่ายแดง</h2>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>ชื่อนักกีฬา</label>
            <input
              type="text"
              value={localNames.player1}
              onChange={(e) => handleNameChange(PLAYERS.PLAYER1, e.target.value)}
              placeholder="ชื่อนักกีฬา..."
              style={inputStyle}
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
              maxLength={30}
            />
          </div>

          <LogoUpload
            logoData={teamLogos.player1}
            onLogoChange={(logoData) => updateTeamLogo(PLAYERS.PLAYER1, logoData)}
          />
        </div>

        {/* Player 2 Setup */}
        <div style={playerSectionStyle}>
          <h2 style={player2HeaderStyle}>ฝ่ายน้ำเงิน</h2>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>ชื่อนักกีฬา</label>
            <input
              type="text"
              value={localNames.player2}
              onChange={(e) => handleNameChange(PLAYERS.PLAYER2, e.target.value)}
              placeholder="ชื่อนักกีฬา..."
              style={inputStyle}
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
              maxLength={30}
            />
          </div>

          <LogoUpload
            logoData={teamLogos.player2}
            onLogoChange={(logoData) => updateTeamLogo(PLAYERS.PLAYER2, logoData)}
          />
        </div>
      </div>
    </div>
  );
};

export default SetupScreen;
