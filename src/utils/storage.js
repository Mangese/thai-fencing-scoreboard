import { STORAGE_KEYS } from './constants.js';

// Save data to localStorage
export const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

// Load data from localStorage
export const loadFromStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return defaultValue;
  }
};

// Remove data from localStorage
export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};

// Clear all game data
export const clearAllGameData = () => {
  Object.values(STORAGE_KEYS).forEach(key => {
    removeFromStorage(key);
  });
};

// Save game state
export const saveGameState = (gameState) => {
  saveToStorage(STORAGE_KEYS.GAME_STATE, gameState);
};

// Load game state
export const loadGameState = () => {
  return loadFromStorage(STORAGE_KEYS.GAME_STATE);
};

// Save player names
export const savePlayerNames = (names) => {
  saveToStorage(STORAGE_KEYS.PLAYER_NAMES, names);
};

// Load player names
export const loadPlayerNames = () => {
  return loadFromStorage(STORAGE_KEYS.PLAYER_NAMES, {
    player1: '',
    player2: ''
  });
};

// Save team logos (as base64 strings)
export const saveTeamLogos = (logos) => {
  saveToStorage(STORAGE_KEYS.TEAM_LOGOS, logos);
};

// Load team logos
export const loadTeamLogos = () => {
  return loadFromStorage(STORAGE_KEYS.TEAM_LOGOS, {
    player1: null,
    player2: null
  });
};

// Save match logs
export const saveMatchLogs = (logs) => {
  saveToStorage(STORAGE_KEYS.MATCH_LOGS, logs);
};

// Load match logs
export const loadMatchLogs = () => {
  return loadFromStorage(STORAGE_KEYS.MATCH_LOGS, []);
};

// Add log entry
export const addLogEntry = (action, details = {}) => {
  const logs = loadMatchLogs();
  const newEntry = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    action,
    details
  };

  const updatedLogs = [...logs, newEntry];
  saveMatchLogs(updatedLogs);

  return newEntry;
};
