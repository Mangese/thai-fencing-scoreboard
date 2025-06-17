import React, { useState, useEffect } from 'react';
import { SCREEN_TYPES, WARNING_DISPLAY, PLAYERS } from '../../utils/constants.js';
import { loadMatchLogs } from '../../utils/storage.js';

const LogsScreen = ({
                      setCurrentScreen,
                      getPlayerData
                    }) => {
  const [logs, setLogs] = useState([]);
  const [filter, setFilter] = useState('ALL');

  const player1 = getPlayerData(PLAYERS.PLAYER1);
  const player2 = getPlayerData(PLAYERS.PLAYER2);

  useEffect(() => {
    const loadLogs = () => {
      const allLogs = loadMatchLogs();
      setLogs(allLogs);
    };

    loadLogs();

    // Refresh logs every second to show real-time updates
    const interval = setInterval(loadLogs, 1000);

    return () => clearInterval(interval);
  }, []);

  const getActionDescription = (log) => {
    const { action, details } = log;

    switch (action) {
      case 'POINT_SCORED':
        const playerName = details.player === PLAYERS.PLAYER1 ? player1.name : player2.name;
        return `🎯 ${playerName} scored a point (Score: ${details.newScore})`;

      case 'WARNING_ADDED':
        const warnedPlayer = details.player === PLAYERS.PLAYER1 ? player1.name : player2.name;
        const warningConfig = WARNING_DISPLAY[details.warningType];
        return `⚠️ ${warnedPlayer} received ${warningConfig.label} warning (${details.count}/2)`;

      case 'PENALTY_POINT':
        const penalized = details.penalizedPlayer === PLAYERS.PLAYER1 ? player1.name : player2.name;
        const beneficiary = details.beneficiary === PLAYERS.PLAYER1 ? player1.name : player2.name;
        const reason = WARNING_DISPLAY[details.reason]?.label || details.reason;
        return `🚫 ${penalized} penalized for ${reason}. ${beneficiary} awarded point (Score: ${details.newScore})`;

      case 'WARNINGS_RESET':
        return '🔄 All warnings reset';

      case 'TIMER_STARTED':
        return '▶️ Timer started';

      case 'TIMER_PAUSED':
        return '⏸️ Timer paused';

      case 'TIMER_RESET':
        return '🔄 Timer reset to 3:00';

      case 'TIMER_EXTENDED':
        return '⏰ Timer extended by 1 minute';

      case 'MAIN_TIME_ENDED':
        return '⏰ Main time ended (3:00 → 0:00)';

      case 'MATCH_WON':
        const winner = details.winner === PLAYERS.PLAYER1 ? player1.name :
          details.winner === PLAYERS.PLAYER2 ? player2.name : 'Draw';
        return `🏆 Match won by ${winner}`;

      case 'MATCH_ENDED_TIME':
        const timeWinner = details.winner === PLAYERS.PLAYER1 ? player1.name :
          details.winner === PLAYERS.PLAYER2 ? player2.name : 'Draw';
        return `⏰ Match ended by time. Winner: ${timeWinner}`;

      default:
        return `${action}: ${JSON.stringify(details)}`;
    }
  };

  const getActionCategory = (action) => {
    if (['POINT_SCORED', 'PENALTY_POINT'].includes(action)) return 'SCORING';
    if (['WARNING_ADDED', 'WARNINGS_RESET'].includes(action)) return 'WARNINGS';
    if (['TIMER_STARTED', 'TIMER_PAUSED', 'TIMER_RESET', 'TIMER_EXTENDED', 'MAIN_TIME_ENDED'].includes(action)) return 'TIMER';
    if (['MATCH_WON', 'MATCH_ENDED_TIME'].includes(action)) return 'MATCH';
    return 'OTHER';
  };

  const filteredLogs = filter === 'ALL' ? logs : logs.filter(log => getActionCategory(log.action) === filter);

  const containerStyle = {
    height: '100vh',
    backgroundColor: '#f8f9fa',
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem',
    fontFamily: 'Arial, sans-serif'
  };

  const headerStyle = {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '1rem',
    marginBottom: '1rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const titleStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '1rem',
    textAlign: 'center'
  };

  const controlsStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
    flexWrap: 'wrap'
  };

  const filterStyle = {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center'
  };

  const filterButtonStyle = {
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'all 0.3s ease'
  };

  const activeFilterStyle = {
    ...filterButtonStyle,
    backgroundColor: '#007bff',
    color: 'white'
  };

  const inactiveFilterStyle = {
    ...filterButtonStyle,
    backgroundColor: '#f8f9fa',
    color: '#333',
    border: '1px solid #ddd'
  };

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    fontWeight: 'bold',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  };

  const logsContainerStyle = {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  };

  const logsListStyle = {
    flex: 1,
    overflow: 'auto',
    padding: '1rem'
  };

  const logEntryStyle = {
    padding: '0.75rem',
    borderBottom: '1px solid #f0f0f0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '1rem'
  };

  const logContentStyle = {
    flex: 1,
    fontSize: '1rem',
    color: '#333'
  };

  const logTimeStyle = {
    fontSize: '0.8rem',
    color: '#666',
    whiteSpace: 'nowrap',
    fontFamily: 'monospace'
  };

  const emptyStateStyle = {
    textAlign: 'center',
    color: '#666',
    fontSize: '1.2rem',
    padding: '3rem',
    fontStyle: 'italic'
  };

  const statsStyle = {
    padding: '1rem',
    backgroundColor: '#f8f9fa',
    borderTop: '1px solid #eee',
    fontSize: '0.9rem',
    color: '#666',
    textAlign: 'center'
  };

  const filters = [
    { key: 'ALL', label: 'All Actions' },
    { key: 'SCORING', label: 'Scoring' },
    { key: 'WARNINGS', label: 'Warnings' },
    { key: 'TIMER', label: 'Timer' },
    { key: 'MATCH', label: 'Match Events' }
  ];

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Match Logs</h1>

        <div style={controlsStyle}>
          <div style={filterStyle}>
            <span style={{ marginRight: '0.5rem', fontWeight: 'bold' }}>Filter:</span>
            {filters.map(filterOption => (
              <button
                key={filterOption.key}
                style={filter === filterOption.key ? activeFilterStyle : inactiveFilterStyle}
                onClick={() => setFilter(filterOption.key)}
              >
                {filterOption.label}
              </button>
            ))}
          </div>

          <button
            style={backButtonStyle}
            onClick={() => setCurrentScreen(SCREEN_TYPES.GAME)}
            onMouseOver={(e) => e.target.style.backgroundColor = '#5a6268'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#6c757d'}
          >
            Back to Match
          </button>
        </div>
      </div>

      <div style={logsContainerStyle}>
        <div style={logsListStyle}>
          {filteredLogs.length === 0 ? (
            <div style={emptyStateStyle}>
              {logs.length === 0 ? 'No actions recorded yet' : `No ${filter.toLowerCase()} actions found`}
            </div>
          ) : (
            filteredLogs
              .slice()
              .reverse() // Show newest first
              .map((log, index) => (
                <div key={log.id} style={logEntryStyle}>
                  <div style={logContentStyle}>
                    {getActionDescription(log)}
                  </div>
                  <div style={logTimeStyle}>
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              ))
          )}
        </div>

        <div style={statsStyle}>
          Showing {filteredLogs.length} of {logs.length} total actions
        </div>
      </div>
    </div>
  );
};

export default LogsScreen;
