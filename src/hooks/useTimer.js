import { useEffect, useRef } from 'react';
import { TIMER_STATES, GAME_CONFIG, WINDOW_TYPES } from '../utils/constants.js';
import { useAudio } from './useAudio.js';

// Custom hook for timer management
export const useTimer = (gameState, setGameState, windowType = WINDOW_TYPES.CONTROL) => {
  console.log('⏱️ useTimer: Hook called with gameState:', gameState);
  console.log('⏱️ useTimer: setGameState type:', typeof setGameState);
  console.log('⏱️ useTimer: windowType:', windowType);

  const intervalRef = useRef(null);
  const lastAlertTimeRef = useRef(null);
  const { playOneMinuteAlert, playTimeUpAlert } = useAudio();

  // Only run timer logic in Control window
  const shouldRunTimer = windowType === WINDOW_TYPES.CONTROL;
  console.log('⏱️ useTimer: shouldRunTimer:', shouldRunTimer);

  // Single effect that handles everything
  useEffect(() => {
    console.log('⏱️ useTimer: Effect triggered');
    console.log('⏱️ useTimer: gameState in effect:', gameState);

    // Safety checks
    if (!gameState) {
      console.error('⏱️ useTimer: gameState is undefined!');
      return;
    }
    if (!gameState.timer) {
      console.error('⏱️ useTimer: gameState.timer is undefined!');
      return;
    }
    if (!setGameState) {
      console.error('⏱️ useTimer: setGameState is undefined!');
      return;
    }
    if (!shouldRunTimer) {
      console.log('⏱️ useTimer: Skipping timer - not control window');
      return;
    }

    console.log('⏱️ useTimer: Timer state:', gameState.timer.state);

    // Clear any existing interval first
    if (intervalRef.current) {
      console.log('⏱️ useTimer: Clearing existing interval');
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Only start interval if timer should be running
    if (gameState.timer.state === TIMER_STATES.RUNNING) {
      intervalRef.current = setInterval(() => {
        setGameState(prevState => {
          // Safety check - only update if still running
          if (prevState.timer.state !== TIMER_STATES.RUNNING) {
            return prevState;
          }

          const newTimeLeft = Math.max(0, prevState.timer.timeLeft - 1);

          // Create new state
          const newState = { ...prevState };
          newState.timer = { ...prevState.timer };
          newState.timer.timeLeft = newTimeLeft;

          // Check if time is up
          if (newTimeLeft === 0) {
            newState.timer.state = TIMER_STATES.ENDED;

            if (newState.timer.isExtended) {
              // Match ends immediately if extended time is up
              newState.matchEndTime = new Date().toISOString();
              newState.currentScreen = 'SUMMARY';

              // Determine winner by score
              const score1 = newState.scores['PLAYER1'];
              const score2 = newState.scores['PLAYER2'];

              if (score1 > score2) {
                newState.winner = 'PLAYER1';
              } else if (score2 > score1) {
                newState.winner = 'PLAYER2';
              } else {
                newState.winner = 'DRAW';
              }
            }
          }

          return newState;
        });
      }, 1000);
    }

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [gameState?.timer?.state, shouldRunTimer]); // Add shouldRunTimer to dependencies

  console.log('⏱️ useTimer: Effect dependency gameState?.timer?.state:', gameState?.timer?.state);

  // Handle audio alerts in separate effect
  useEffect(() => {
    console.log('⏱️ useTimer: Audio effect triggered');
    console.log('⏱️ useTimer: gameState for audio:', gameState);

    // Safety checks
    if (!gameState || !gameState.timer || !shouldRunTimer) {
      console.log('⏱️ useTimer: Skipping audio effect - no gameState.timer or not control window');
      return;
    }

    const timeLeft = gameState.timer.timeLeft;
    const timerState = gameState.timer.state;
    const isExtended = gameState.timer.isExtended;

    console.log('⏱️ useTimer: Audio effect values:', { timeLeft, timerState, isExtended });

    // Play 1-minute alert (only for main timer, not extended)
    if (!isExtended &&
      timeLeft === GAME_CONFIG.AUDIO_ALERT_TIME &&
      timerState === TIMER_STATES.RUNNING &&
      lastAlertTimeRef.current !== timeLeft) {

      playOneMinuteAlert();
      lastAlertTimeRef.current = timeLeft;
    }

    // Play time up alert
    if (timeLeft === 0 &&
      timerState === TIMER_STATES.ENDED &&
      lastAlertTimeRef.current !== 0) {

      playTimeUpAlert();
      lastAlertTimeRef.current = 0;
    }

    // Reset alert tracker when timer is reset
    if (timeLeft === GAME_CONFIG.INITIAL_TIME) {
      lastAlertTimeRef.current = null;
    }
  }, [gameState?.timer?.timeLeft, gameState?.timer?.state, gameState?.timer?.isExtended, shouldRunTimer, playOneMinuteAlert, playTimeUpAlert]);

  console.log('⏱️ useTimer: Audio effect dependencies:', {
    timeLeft: gameState?.timer?.timeLeft,
    state: gameState?.timer?.state,
    isExtended: gameState?.timer?.isExtended,
    shouldRunTimer,
    playOneMinuteAlert: typeof playOneMinuteAlert,
    playTimeUpAlert: typeof playTimeUpAlert
  });

  // Check if extension button should be shown
  const shouldShowExtension = gameState.timer.timeLeft === 0 &&
    gameState.timer.state === TIMER_STATES.ENDED &&
    !gameState.timer.isExtended;

  // Check if timer is running
  const isRunning = gameState.timer.state === TIMER_STATES.RUNNING;

  // Check if timer can be started
  const canStart = gameState.timer.state === TIMER_STATES.STOPPED ||
    gameState.timer.state === TIMER_STATES.PAUSED;

  return {
    shouldShowExtension,
    isRunning,
    canStart
  };
};
