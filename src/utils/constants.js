import { FaExclamationTriangle, FaBell } from 'react-icons/fa';

// Game Constants
export const GAME_CONFIG = {
  WINNING_SCORE: 5,
  INITIAL_TIME: 180, // 3 minutes in seconds
  EXTENSION_TIME: 60, // 1 minute in seconds
  WARNING_THRESHOLD: 2, // 2 warnings of same type = opponent point
  AUDIO_ALERT_TIME: 60 // Alert at 1 minute remaining
};

// Warning Types
export const WARNING_TYPES = {
  OUT_OF_BOUNDS: 'OUT_OF_BOUNDS',
  WEAPON_NOT_IN_HAND: 'WEAPON_NOT_IN_HAND',
  GENERAL_WARNING: 'GENERAL_WARNING'
};

// Warning Display Config
export const WARNING_DISPLAY = {
  [WARNING_TYPES.OUT_OF_BOUNDS]: {
    icon: FaBell,
    color: 'red',
    label: 'Out of Bounds'
  },
  [WARNING_TYPES.WEAPON_NOT_IN_HAND]: {
    icon: FaBell,
    color: 'orange',
    label: 'Weapon Warning'
  },
  [WARNING_TYPES.GENERAL_WARNING]: {
    icon: FaBell,
    color: 'purple',
    label: 'General Warning'
  }
};

// Screen Types
export const SCREEN_TYPES = {
  SETUP: 'SETUP',
  GAME: 'GAME',
  SUMMARY: 'SUMMARY',
  LOGS: 'LOGS'
};

// Window Types
export const WINDOW_TYPES = {
  DISPLAY: 'DISPLAY',
  CONTROL: 'CONTROL'
};

// Player IDs
export const PLAYERS = {
  PLAYER1: 'PLAYER1',
  PLAYER2: 'PLAYER2'
};

// Timer States
export const TIMER_STATES = {
  STOPPED: 'STOPPED',
  RUNNING: 'RUNNING',
  PAUSED: 'PAUSED',
  ENDED: 'ENDED',
  EXTENDED: 'EXTENDED'
};

// Storage Keys
export const STORAGE_KEYS = {
  GAME_STATE: 'thai_fencing_game_state',
  PLAYER_NAMES: 'thai_fencing_player_names',
  TEAM_LOGOS: 'thai_fencing_team_logos',
  MATCH_LOGS: 'thai_fencing_match_logs'
};

// Default Values
export const DEFAULTS = {
  PLAYER_NAME: 'Player',
  TEAM_LOGO_TEXT: 'LOGO'
};
