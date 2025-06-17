import {
  GAME_CONFIG,
  WARNING_TYPES,
  PLAYERS,
  TIMER_STATES
} from './constants.js';
import { addLogEntry } from './storage.js';

// Initialize empty game state
export const createInitialGameState = () => ({
  scores: {
    [PLAYERS.PLAYER1]: 0,
    [PLAYERS.PLAYER2]: 0
  },
  warnings: {
    [PLAYERS.PLAYER1]: {
      [WARNING_TYPES.OUT_OF_BOUNDS]: 0,
      [WARNING_TYPES.WEAPON_NOT_IN_HAND]: 0,
      [WARNING_TYPES.GENERAL_WARNING]: 0
    },
    [PLAYERS.PLAYER2]: {
      [WARNING_TYPES.OUT_OF_BOUNDS]: 0,
      [WARNING_TYPES.WEAPON_NOT_IN_HAND]: 0,
      [WARNING_TYPES.GENERAL_WARNING]: 0
    }
  },
  timer: {
    timeLeft: GAME_CONFIG.INITIAL_TIME,
    state: TIMER_STATES.STOPPED,
    isExtended: false
  },
  currentScreen: 'SETUP',
  winner: null,
  matchStartTime: null,
  matchEndTime: null
});

// Add point to player
export const addPoint = (gameState, playerId) => {
  const newState = { ...gameState };
  newState.scores[playerId] += 1;

  // Reset all warnings when someone scores
  resetAllWarnings(newState);

  // Log the action
  addLogEntry('POINT_SCORED', {
    player: playerId,
    newScore: newState.scores[playerId]
  });

  // Check for winner
  if (newState.scores[playerId] >= GAME_CONFIG.WINNING_SCORE) {
    newState.winner = playerId;
    newState.matchEndTime = new Date().toISOString();
    newState.currentScreen = 'SUMMARY';

    addLogEntry('MATCH_WON', { winner: playerId });
  }

  return newState;
};

// Add warning to player
export const addWarning = (gameState, playerId, warningType) => {
  const newState = { ...gameState };
  const currentWarnings = newState.warnings[playerId][warningType];

  // Add warning
  newState.warnings[playerId][warningType] = currentWarnings + 1;

  // Log the warning
  addLogEntry('WARNING_ADDED', {
    player: playerId,
    warningType,
    count: currentWarnings + 1
  });

  // Check if this is the second warning of same type
  if (currentWarnings + 1 >= GAME_CONFIG.WARNING_THRESHOLD) {
    // Give opponent a point
    const opponent = playerId === PLAYERS.PLAYER1 ? PLAYERS.PLAYER2 : PLAYERS.PLAYER1;
    newState.scores[opponent] += 1;

    // Reset all warnings
    resetAllWarnings(newState);

    // Log the penalty point
    addLogEntry('PENALTY_POINT', {
      penalizedPlayer: playerId,
      beneficiary: opponent,
      reason: warningType,
      newScore: newState.scores[opponent]
    });

    // Check for winner
    if (newState.scores[opponent] >= GAME_CONFIG.WINNING_SCORE) {
      newState.winner = opponent;
      newState.matchEndTime = new Date().toISOString();
      newState.currentScreen = 'SUMMARY';

      addLogEntry('MATCH_WON', { winner: opponent });
    }
  }

  return newState;
};

// Reset all warnings for both players
export const resetAllWarnings = (gameState) => {
  Object.keys(gameState.warnings).forEach(playerId => {
    Object.keys(gameState.warnings[playerId]).forEach(warningType => {
      gameState.warnings[playerId][warningType] = 0;
    });
  });

  addLogEntry('WARNINGS_RESET');
};

// Start timer
export const startTimer = (gameState) => {
  const newState = { ...gameState };
  newState.timer.state = TIMER_STATES.RUNNING;

  if (!newState.matchStartTime) {
    newState.matchStartTime = new Date().toISOString();
  }

  addLogEntry('TIMER_STARTED', { timeLeft: newState.timer.timeLeft });
  return newState;
};

// Pause timer
export const pauseTimer = (gameState) => {
  const newState = { ...gameState };
  newState.timer.state = TIMER_STATES.PAUSED;

  addLogEntry('TIMER_PAUSED', { timeLeft: newState.timer.timeLeft });
  return newState;
};

// Reset timer to initial time
export const resetTimer = (gameState) => {
  const newState = { ...gameState };
  newState.timer.timeLeft = GAME_CONFIG.INITIAL_TIME;
  newState.timer.state = TIMER_STATES.STOPPED;
  newState.timer.isExtended = false;

  addLogEntry('TIMER_RESET');
  return newState;
};

// Extend timer by 1 minute
export const extendTimer = (gameState) => {
  const newState = { ...gameState };
  newState.timer.timeLeft = GAME_CONFIG.EXTENSION_TIME;
  newState.timer.state = TIMER_STATES.RUNNING;
  newState.timer.isExtended = true;

  addLogEntry('TIMER_EXTENDED', { newTime: GAME_CONFIG.EXTENSION_TIME });
  return newState;
};

// Update timer (called every second) - SIMPLIFIED VERSION
export const updateTimer = (gameState) => {
  // This function is kept for compatibility but logic moved to useTimer hook
  return gameState;
};

// Get match duration in seconds
export const getMatchDuration = (gameState) => {
  if (!gameState.matchStartTime) return 0;

  const endTime = gameState.matchEndTime ? new Date(gameState.matchEndTime) : new Date();
  const startTime = new Date(gameState.matchStartTime);

  return Math.floor((endTime - startTime) / 1000);
};

// Format time in MM:SS format
export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// Get opponent player ID
export const getOpponent = (playerId) => {
  return playerId === PLAYERS.PLAYER1 ? PLAYERS.PLAYER2 : PLAYERS.PLAYER1;
};

// Check if match is over
export const isMatchOver = (gameState) => {
  return gameState.winner !== null ||
    (gameState.timer.timeLeft === 0 && gameState.timer.isExtended);
};
