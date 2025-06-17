import { useCallback, useRef } from 'react';

// Custom hook for audio alerts
export const useAudio = () => {
  console.log('🔊 useAudio: Hook called');

  const audioContextRef = useRef(null);

  // Initialize audio context
  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  // Create beep sound
  const createBeep = useCallback((frequency = 800, duration = 200, volume = 0.3) => {
    const audioContext = initAudioContext();

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration / 1000);
  }, [initAudioContext]);

  // Play 1-minute warning alert
  const playOneMinuteAlert = useCallback(() => {
    // Play three beeps for 1-minute warning
    createBeep(800, 300, 0.4);
    setTimeout(() => createBeep(800, 300, 0.4), 400);
    setTimeout(() => createBeep(800, 300, 0.4), 800);
  }, [createBeep]);

  // Play time up alert
  const playTimeUpAlert = useCallback(() => {
    // Play long beep for time up
    createBeep(600, 1000, 0.5);
  }, [createBeep]);

  // Play button click sound
  const playClickSound = useCallback(() => {
    createBeep(1000, 100, 0.2);
  }, [createBeep]);

  // Play point scored sound
  const playPointSound = useCallback(() => {
    // Play ascending tones for point
    createBeep(600, 150, 0.3);
    setTimeout(() => createBeep(800, 150, 0.3), 150);
  }, [createBeep]);

  // Play warning sound
  const playWarningSound = useCallback(() => {
    // Play descending tone for warning
    createBeep(400, 300, 0.4);
  }, [createBeep]);

  // Play match end sound
  const playMatchEndSound = useCallback(() => {
    // Play victory fanfare
    createBeep(600, 200, 0.4);
    setTimeout(() => createBeep(800, 200, 0.4), 200);
    setTimeout(() => createBeep(1000, 400, 0.4), 400);
  }, [createBeep]);

  return {
    playOneMinuteAlert,
    playTimeUpAlert,
    playClickSound,
    playPointSound,
    playWarningSound,
    playMatchEndSound
  };
};
