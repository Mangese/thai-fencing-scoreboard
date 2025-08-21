import { useState, useEffect, useCallback, useRef } from 'react';
import {
  createInitialGameState,
  addPoint,
  addWarning,
  startTimer,
  pauseTimer,
  resetTimer,
  extendTimer,
  subtractPoint
} from '../utils/gameLogic.js';
import {
  saveGameState,
  loadGameState,
  savePlayerNames,
  loadPlayerNames,
  saveTeamLogos,
  loadTeamLogos,
  clearAllGameData
} from '../utils/storage.js';
import { PLAYERS, SCREEN_TYPES } from '../utils/constants.js';
import { useAudio } from './useAudio.js';

// Main game state management hook
export const useGameState = () => {
  // console.log('🎮 useGameState: Hook called');

  const [gameState, setGameState] = useState(() => {
    // console.log('🎮 useGameState: Initializing state');
    const saved = loadGameState();
    const initial = saved || createInitialGameState();
    // console.log('🎮 useGameState: Initial state:', initial);
    return initial;
  });

  const [playerNames, setPlayerNames] = useState(() => {
    // console.log('🎮 useGameState: Loading player names');
    const names = loadPlayerNames();
    // console.log('🎮 useGameState: Player names:', names);
    return names;
  });

  const [teamLogos, setTeamLogos] = useState(() => {
    // console.log('🎮 useGameState: Loading team logos');
    const logos = loadTeamLogos();
    // console.log('🎮 useGameState: Team logos:', logos);
    return logos;
  });

  // Use ref to prevent multiple setState calls
  const gameStateRef = useRef(gameState);
  gameStateRef.current = gameState;

  // console.log('🎮 useGameState: Current gameState:', gameState);
  // console.log('🎮 useGameState: Current playerNames:', playerNames);
  // console.log('🎮 useGameState: Current teamLogos:', teamLogos);

  const { playPointSound, playWarningSound, playMatchEndSound, playClickSound } = useAudio();

  // Set up IPC communication for Electron
  useEffect(() => {
    if (window.electronAPI && window.electronAPI.onGameStateUpdate) {
      // console.log('🎮 useGameState: Setting up IPC listener');

      const handleGameStateUpdate = (newGameState) => {
        // console.log('🎮 useGameState: Received game state update:', newGameState);
        setGameState(newGameState);
      };

      window.electronAPI.onGameStateUpdate(handleGameStateUpdate);

      return () => {
        // console.log('🎮 useGameState: Cleaning up IPC listener');
        window.electronAPI.removeGameStateListener();
      };
    }
  }, []);

  // Sync game state changes to other windows
  const syncGameState = useCallback((newState) => {
    // console.log('🎮 useGameState: Syncing game state:', newState);
    if (window.electronAPI && window.electronAPI.syncGameState) {
      window.electronAPI.syncGameState(newState);
    }
  }, []);

  // Custom setState that also syncs to other windows
  const setSyncedGameState = useCallback((updater) => {
    setGameState(prevState => {
      const newState = typeof updater === 'function' ? updater(prevState) : updater;
      // console.log('🎮 useGameState: Setting synced game state:', newState);

      // Sync to other windows (with small delay to avoid race conditions)
      setTimeout(() => syncGameState(newState), 50);

      return newState;
    });
  }, [syncGameState]);

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    if (gameState) {
      saveGameState(gameState);
    }
  }, [gameState]);

  // Save player names to localStorage
  useEffect(() => {
    if (playerNames) {
      savePlayerNames(playerNames);
    }
  }, [playerNames]);

  // Save team logos to localStorage
  useEffect(() => {
    if (teamLogos) {
      saveTeamLogos(teamLogos);
    }
  }, [teamLogos]);

  // Player Actions
  const handleAddPoint = useCallback((playerId) => {
    setSyncedGameState(prevState => {
      const newState = addPoint(prevState, playerId);

      // Play sound effects
      console.log('addPoint', playerId, playerId);
      playPointSound();
      if (newState.winner) {
        setTimeout(() => playMatchEndSound(), 500);
      }

      return newState;
    });
  }, [setSyncedGameState, playPointSound, playMatchEndSound]);
  const handleSubtractPoint = useCallback((playerId) => {
    setSyncedGameState(prevState => {
      const newState = subtractPoint(prevState, playerId);

      console.log('subtractPoint', playerId, playerId);
      // Play sound effects
      playPointSound();

      return newState;
    });
  }, [setSyncedGameState, playPointSound, playMatchEndSound]);

  const handleAddWarning = useCallback((playerId, warningType) => {
    setSyncedGameState(prevState => {
      const newState = addWarning(prevState, playerId, warningType);
      playWarningSound();

      // Check if penalty point was awarded and play appropriate sound
      const oldScore = prevState.scores[playerId === PLAYERS.PLAYER1 ? PLAYERS.PLAYER2 : PLAYERS.PLAYER1];
      const newScore = newState.scores[playerId === PLAYERS.PLAYER1 ? PLAYERS.PLAYER2 : PLAYERS.PLAYER1];

      if (newScore > oldScore) {
        setTimeout(() => playPointSound(), 300);
        if (newState.winner) {
          setTimeout(() => playMatchEndSound(), 800);
        }
      }

      return newState;
    });
  }, [setSyncedGameState, playWarningSound, playPointSound, playMatchEndSound]);

  // Timer Actions
  const handleStartTimer = useCallback(() => {
    setSyncedGameState(prevState => startTimer(prevState));
    playClickSound();
  }, [setSyncedGameState, playClickSound]);

  const handlePauseTimer = useCallback(() => {
    setSyncedGameState(prevState => pauseTimer(prevState));
    playClickSound();
  }, [setSyncedGameState, playClickSound]);

  const handleResetTimer = useCallback(() => {
    setSyncedGameState(prevState => resetTimer(prevState));
    playClickSound();
  }, [setSyncedGameState, playClickSound]);

  const handleExtendTimer = useCallback(() => {
    setSyncedGameState(prevState => extendTimer(prevState));
    playClickSound();
  }, [setSyncedGameState, playClickSound]);

  // Screen Navigation
  const setCurrentScreen = useCallback((screen) => {
    setSyncedGameState(prevState => ({
      ...prevState,
      currentScreen: screen
    }));
    playClickSound();
  }, [setSyncedGameState, playClickSound]);

  // Player Setup
  const updatePlayerName = useCallback((playerId, name) => {
    setPlayerNames(prevNames => ({
      ...prevNames,
      [playerId.toLowerCase()]: name
    }));
  }, []);

  const updateTeamLogo = useCallback((playerId, logoData) => {
    setTeamLogos(prevLogos => ({
      ...prevLogos,
      [playerId.toLowerCase()]: logoData
    }));
  }, []);

  // Game Management
  const startNewMatch = useCallback((player1Name, player1Logo, player2Name, player2Logo) => {
    const initialState = createInitialGameState();
    initialState.currentScreen = SCREEN_TYPES.GAME;
    initialState.matchStartTime = new Date().toISOString();
    initialState.name[PLAYERS.PLAYER1] = player1Name;
    initialState.name[PLAYERS.PLAYER2] = player2Name;
    initialState.logo[PLAYERS.PLAYER1] = player1Logo;
    initialState.logo[PLAYERS.PLAYER2] = player2Logo;
    setSyncedGameState(initialState);
    playClickSound();
  }, [setSyncedGameState, playClickSound]);

  const resetGame = useCallback(() => {
    setSyncedGameState(createInitialGameState());
    playClickSound();
  }, [setSyncedGameState, playClickSound]);

  const resetAll = useCallback(() => {
    clearAllGameData();
    setSyncedGameState(createInitialGameState());
    setPlayerNames({ player1: '', player2: '' });
    setTeamLogos({ player1: null, player2: null });
    playClickSound();
  }, [setSyncedGameState, playClickSound]);

  // Get formatted player data
  const getPlayerData = useCallback((playerId) => {
    const playerKey = playerId.toLowerCase();
    return {
      id: playerId,
      name: playerNames[playerKey] || `Player ${playerId === PLAYERS.PLAYER1 ? '1' : '2'}`,
      logo: teamLogos[playerKey],
      score: gameState.scores[playerId],
      warnings: gameState.warnings[playerId]
    };
  }, [playerNames, teamLogos, gameState.scores, gameState.warnings]);

  return {
    // State
    gameState,
    setGameState: setSyncedGameState, // Use synced version
    playerNames,
    teamLogos,

    // Player Actions
    handleAddPoint,
    handleSubtractPoint,
    handleAddWarning,

    // Timer Actions
    handleStartTimer,
    handlePauseTimer,
    handleResetTimer,
    handleExtendTimer,

    // Navigation
    setCurrentScreen,

    // Setup Actions
    updatePlayerName,
    updateTeamLogo,

    // Game Management
    startNewMatch,
    resetGame,
    resetAll,

    // Utilities
    getPlayerData
  };
};
