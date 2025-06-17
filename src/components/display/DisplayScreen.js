import React from 'react';
import { PLAYERS } from '../../utils/constants.js';
import TeamLogo from '../common/TeamLogo.js';
import PlayerName from '../common/PlayerName.js';
import Score from '../common/Score.js';
import Timer from '../common/Timer.js';
import WarningIcons from '../common/WarningIcons.js';
import CompetitionLogo from './CompetitionLogo.js';

const DisplayScreen = ({ gameState, getPlayerData }) => {
  const player1 = getPlayerData(PLAYERS.PLAYER1);
  const player2 = getPlayerData(PLAYERS.PLAYER2);

  const containerStyle = {
    height: '100vh',
    width: '100vw',
    backgroundColor: '#f8f9fa',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Arial, sans-serif'
  };

  const topSectionStyle = {
    display: 'flex',
    height: '25%',
    alignItems: 'center'
  };

  const logoSectionStyle = {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem'
  };

  const timerSectionStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '15%',
    backgroundColor: '#fff',
    borderTop: '2px solid #ddd',
    borderBottom: '2px solid #ddd'
  };

  const namesSectionStyle = {
    display: 'flex',
    height: '10%',
    alignItems: 'center',
    backgroundColor: '#fff'
  };

  const nameAreaStyle = {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 2rem'
  };

  const centerLogoSectionStyle = {
    height: '20%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  };

  const scoresSectionStyle = {
    display: 'flex',
    height: '20%',
    alignItems: 'center',
    backgroundColor: '#fff'
  };

  const scoreAreaStyle = {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const warningsSectionStyle = {
    display: 'flex',
    height: '10%',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderTop: '1px solid #ddd'
  };

  const warningAreaStyle = {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 2rem'
  };

  return (
    <div style={containerStyle}>
      {/* Top Section - Team Logos */}
      <div style={topSectionStyle}>
        <div style={logoSectionStyle}>
          <TeamLogo
            logoData={player1.logo}
            size="150px"
          />
        </div>
        <div style={logoSectionStyle}>
          <TeamLogo
            logoData={player2.logo}
            size="150px"
          />
        </div>
      </div>

      {/* Timer Section */}
      <div style={timerSectionStyle}>
        <Timer
          timeLeft={gameState.timer.timeLeft}
          timerState={gameState.timer.state}
          isExtended={gameState.timer.isExtended}
          fontSize="5rem"
        />
      </div>

      {/* Player Names Section */}
      <div style={namesSectionStyle}>
        <div style={nameAreaStyle}>
          <PlayerName
            name={player1.name}
            fontSize="2.5rem"
            color="#FF4444"
          />
        </div>
        <div style={nameAreaStyle}>
          <PlayerName
            name={player2.name}
            fontSize="2.5rem"
            color="#4444FF"
          />
        </div>
      </div>

      {/* Competition Logo Section */}
      <div style={centerLogoSectionStyle}>
        <CompetitionLogo maxWidth="250px" />
      </div>

      {/* Scores Section */}
      <div style={scoresSectionStyle}>
        <div style={scoreAreaStyle}>
          <Score
            score={player1.score}
            playerId={PLAYERS.PLAYER1}
            fontSize="14rem"
            isWinner={gameState.winner === PLAYERS.PLAYER1}
          />
        </div>
        <div style={scoreAreaStyle}>
          <Score
            score={player2.score}
            playerId={PLAYERS.PLAYER2}
            fontSize="14rem"
            isWinner={gameState.winner === PLAYERS.PLAYER2}
          />
        </div>
      </div>

      {/* Warnings Section */}
      <div style={warningsSectionStyle}>
        <div style={warningAreaStyle}>
          <WarningIcons
            warnings={player1.warnings}
            size="2.5rem"
          />
        </div>
        <div style={warningAreaStyle}>
          <WarningIcons
            warnings={player2.warnings}
            size="2.5rem"
          />
        </div>
      </div>
    </div>
  );
};

export default DisplayScreen;
