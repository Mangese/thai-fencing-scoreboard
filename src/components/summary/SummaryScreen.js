import React from 'react';
import { PLAYERS, WARNING_TYPES, WARNING_DISPLAY, SCREEN_TYPES } from '../../utils/constants.js';
import { getMatchDuration, formatTime } from '../../utils/gameLogic.js';
import { loadMatchLogs } from '../../utils/storage.js';
import TeamLogo from '../common/TeamLogo.js';

const SummaryScreen = ({
                         gameState,
                         getPlayerData,
                         setCurrentScreen,
                         resetAll
                       }) => {
  const player1 = getPlayerData(PLAYERS.PLAYER1);
  const player2 = getPlayerData(PLAYERS.PLAYER2);
  const matchDuration = getMatchDuration(gameState);
  const logs = loadMatchLogs();

  const getWinnerInfo = () => {
    if (gameState.winner === PLAYERS.PLAYER1) {
      return { name: player1.name, color: '#FF4444' };
    } else if (gameState.winner === PLAYERS.PLAYER2) {
      return { name: player2.name, color: '#4444FF' };
    } else {
      return { name: 'Draw', color: '#666' };
    }
  };

  const winner = getWinnerInfo();

  const containerStyle = {
    height: '100vh',
    backgroundColor: '#f8f9fa',
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
    overflow: 'auto'
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

  const winnerSectionStyle = {
    backgroundColor: '#fff',
    borderRadius: '15px',
    padding: '2rem',
    marginBottom: '2rem',
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    border: `3px solid ${winner.color}`
  };

  const winnerTitleStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: winner.color,
    marginBottom: '1rem'
  };

  const winnerNameStyle = {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: winner.color,
    marginBottom: '1rem',
    textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
  };

  const statsGridStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2rem',
    marginBottom: '2rem'
  };

  const playerStatsStyle = {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '1.5rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const playerHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1rem',
    paddingBottom: '1rem',
    borderBottom: '2px solid #eee'
  };

  const playerNameStyle = {
    fontSize: '1.8rem',
    fontWeight: 'bold'
  };

  const player1NameStyle = {
    ...playerNameStyle,
    color: '#FF4444'
  };

  const player2NameStyle = {
    ...playerNameStyle,
    color: '#4444FF'
  };

  const statRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem 0',
    borderBottom: '1px solid #f0f0f0'
  };

  const statLabelStyle = {
    fontSize: '1.1rem',
    color: '#666'
  };

  const statValueStyle = {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#333'
  };

  const scoreValueStyle = {
    fontSize: '2rem',
    fontWeight: 'bold'
  };

  const player1ScoreStyle = {
    ...scoreValueStyle,
    color: '#FF4444'
  };

  const player2ScoreStyle = {
    ...scoreValueStyle,
    color: '#4444FF'
  };

  const matchInfoStyle = {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '1.5rem',
    marginBottom: '2rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const sectionTitleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '1rem',
    borderBottom: '2px solid #eee',
    paddingBottom: '0.5rem'
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    marginTop: '2rem'
  };

  const buttonStyle = {
    padding: '1rem 2rem',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };

  const backButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#007bff',
    color: 'white'
  };

  const resetButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#dc3545',
    color: 'white'
  };

  const getTotalWarnings = (warnings) => {
    return Object.values(warnings).reduce((total, count) => total + count, 0);
  };

  const formatMatchTime = () => {
    if (gameState.matchStartTime && gameState.matchEndTime) {
      const start = new Date(gameState.matchStartTime);
      const end = new Date(gameState.matchEndTime);
      return {
        started: start.toLocaleTimeString(),
        ended: end.toLocaleTimeString(),
        duration: formatTime(matchDuration)
      };
    }
    return null;
  };

  const matchTimeInfo = formatMatchTime();

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Match Summary</h1>
        <p style={subtitleStyle}>Final Results</p>
      </div>

      {/* Winner Section */}
      <div style={winnerSectionStyle}>
        <div style={winnerTitleStyle}>
          {gameState.winner === 'DRAW' ? '🤝 Match Draw' : '🏆 Winner'}
        </div>
        <div style={winnerNameStyle}>{winner.name}</div>
        {gameState.winner !== 'DRAW' && (
          <div style={{ fontSize: '1.2rem', color: '#666' }}>
            Congratulations!
          </div>
        )}
      </div>

      {/* Player Statistics */}
      <div style={statsGridStyle}>
        {/* Player 1 Stats */}
        <div style={playerStatsStyle}>
          <div style={playerHeaderStyle}>
            <TeamLogo logoData={player1.logo} size="60px" />
            <div style={player1NameStyle}>{player1.name}</div>
          </div>

          <div style={statRowStyle}>
            <span style={statLabelStyle}>Final Score:</span>
            <span style={player1ScoreStyle}>{player1.score}</span>
          </div>

          <div style={statRowStyle}>
            <span style={statLabelStyle}>Total Warnings:</span>
            <span style={statValueStyle}>{getTotalWarnings(player1.warnings)}</span>
          </div>

          {Object.entries(WARNING_TYPES).map(([key, warningType]) => {
            const count = player1.warnings[warningType] || 0;
            const config = WARNING_DISPLAY[warningType];
            return (
              <div key={warningType} style={statRowStyle}>
                <span style={statLabelStyle}>
                  {config.icon} {config.label}:
                </span>
                <span style={statValueStyle}>{count}</span>
              </div>
            );
          })}
        </div>

        {/* Player 2 Stats */}
        <div style={playerStatsStyle}>
          <div style={playerHeaderStyle}>
            <TeamLogo logoData={player2.logo} size="60px" />
            <div style={player2NameStyle}>{player2.name}</div>
          </div>

          <div style={statRowStyle}>
            <span style={statLabelStyle}>Final Score:</span>
            <span style={player2ScoreStyle}>{player2.score}</span>
          </div>

          <div style={statRowStyle}>
            <span style={statLabelStyle}>Total Warnings:</span>
            <span style={statValueStyle}>{getTotalWarnings(player2.warnings)}</span>
          </div>

          {Object.entries(WARNING_TYPES).map(([key, warningType]) => {
            const count = player2.warnings[warningType] || 0;
            const config = WARNING_DISPLAY[warningType];
            return (
              <div key={warningType} style={statRowStyle}>
                <span style={statLabelStyle}>
                  {config.icon} {config.label}:
                </span>
                <span style={statValueStyle}>{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Match Information */}
      <div style={matchInfoStyle}>
        <div style={sectionTitleStyle}>Match Information</div>

        <div style={statRowStyle}>
          <span style={statLabelStyle}>Match Duration:</span>
          <span style={statValueStyle}>
            {matchTimeInfo ? matchTimeInfo.duration : formatTime(matchDuration)}
          </span>
        </div>

        {matchTimeInfo && (
          <>
            <div style={statRowStyle}>
              <span style={statLabelStyle}>Started:</span>
              <span style={statValueStyle}>{matchTimeInfo.started}</span>
            </div>

            <div style={statRowStyle}>
              <span style={statLabelStyle}>Ended:</span>
              <span style={statValueStyle}>{matchTimeInfo.ended}</span>
            </div>
          </>
        )}

        <div style={statRowStyle}>
          <span style={statLabelStyle}>Total Actions Logged:</span>
          <span style={statValueStyle}>{logs.length}</span>
        </div>

        <div style={statRowStyle}>
          <span style={statLabelStyle}>Timer Extended:</span>
          <span style={statValueStyle}>{gameState.timer.isExtended ? 'Yes' : 'No'}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={buttonContainerStyle}>
        <button
          style={backButtonStyle}
          onClick={() => setCurrentScreen(SCREEN_TYPES.SETUP)}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#0056b3';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#007bff';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          Back to Setup
        </button>

        <button
          style={resetButtonStyle}
          onClick={() => {
            if (window.confirm('Reset all data and start over? This cannot be undone.')) {
              resetAll();
            }
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#c82333';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#dc3545';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          Reset All Data
        </button>
      </div>
    </div>
  );
};

export default SummaryScreen;
