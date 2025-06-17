import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Plus, Settings, FileText, Sword, AlertCircle } from 'lucide-react';

const ThaiFencingScoreboard = () => {
  // Game state
  const [currentScreen, setCurrentScreen] = useState('setup'); // setup, game, summary, logs
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [player1OutWarnings, setPlayer1OutWarnings] = useState(0);
  const [player2OutWarnings, setPlayer2OutWarnings] = useState(0);
  const [player1WeaponWarnings, setPlayer1WeaponWarnings] = useState(0);
  const [player2WeaponWarnings, setPlayer2WeaponWarnings] = useState(0);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [logs, setLogs] = useState([]);
  const [winner, setWinner] = useState(null);

  const timerRef = useRef(null);

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('thaiFencingScoreboard');
    if (savedData) {
      const data = JSON.parse(savedData);
      setPlayer1Name(data.player1Name || '');
      setPlayer2Name(data.player2Name || '');
      setPlayer1Score(data.player1Score || 0);
      setPlayer2Score(data.player2Score || 0);
      setPlayer1OutWarnings(data.player1OutWarnings || 0);
      setPlayer2OutWarnings(data.player2OutWarnings || 0);
      setPlayer1WeaponWarnings(data.player1WeaponWarnings || 0);
      setPlayer2WeaponWarnings(data.player2WeaponWarnings || 0);
      setTimeLeft(data.timeLeft || 180);
      setLogs(data.logs || []);
      if (data.currentScreen && data.currentScreen !== 'setup') {
        setCurrentScreen(data.currentScreen);
      }
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    const dataToSave = {
      currentScreen,
      player1Name,
      player2Name,
      player1Score,
      player2Score,
      player1OutWarnings,
      player2OutWarnings,
      player1WeaponWarnings,
      player2WeaponWarnings,
      timeLeft,
      logs
    };
    localStorage.setItem('thaiFencingScoreboard', JSON.stringify(dataToSave));
  }, [currentScreen, player1Name, player2Name, player1Score, player2Score, 
     player1OutWarnings, player2OutWarnings, player1WeaponWarnings, 
     player2WeaponWarnings, timeLeft, logs]);

  // Timer logic
  useEffect(() => {
    if (isTimerRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            addLog('Timer ended - Match finished');
            setCurrentScreen('summary');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isTimerRunning, timeLeft]);

  // Check for winner
  useEffect(() => {
    if (player1Score >= 5) {
      setWinner(player1Name);
      setCurrentScreen('summary');
      setIsTimerRunning(false);
      addLog(`${player1Name} wins with 5 points!`);
    } else if (player2Score >= 5) {
      setWinner(player2Name);
      setCurrentScreen('summary');
      setIsTimerRunning(false);
      addLog(`${player2Name} wins with 5 points!`);
    }
  }, [player1Score, player2Score, player1Name, player2Name]);

  const addLog = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, { time: timestamp, message }]);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const addScore = (player) => {
    if (player === 1) {
      setPlayer1Score(prev => prev + 1);
      setPlayer1OutWarnings(0);
      setPlayer2OutWarnings(0);
      addLog(`${player1Name} scored! Score: ${player1Score + 1}-${player2Score}`);
    } else {
      setPlayer2Score(prev => prev + 1);
      setPlayer1OutWarnings(0);
      setPlayer2OutWarnings(0);
      addLog(`${player2Name} scored! Score: ${player1Score}-${player2Score + 1}`);
    }
  };

  const addOutWarning = (player) => {
    if (player === 1) {
      if (player1OutWarnings >= 1) {
        setPlayer2Score(prev => prev + 1);
        setPlayer1OutWarnings(0);
        setPlayer2OutWarnings(0);
        addLog(`${player1Name} got 2nd out-of-bounds warning. ${player2Name} gets 1 point!`);
      } else {
        setPlayer1OutWarnings(1);
        addLog(`${player1Name} got out-of-bounds warning`);
      }
    } else {
      if (player2OutWarnings >= 1) {
        setPlayer1Score(prev => prev + 1);
        setPlayer1OutWarnings(0);
        setPlayer2OutWarnings(0);
        addLog(`${player2Name} got 2nd out-of-bounds warning. ${player1Name} gets 1 point!`);
      } else {
        setPlayer2OutWarnings(1);
        addLog(`${player2Name} got out-of-bounds warning`);
      }
    }
  };

  const addWeaponWarning = (player) => {
    if (player === 1) {
      if (player1WeaponWarnings >= 1) {
        setPlayer2Score(prev => prev + 1);
        setPlayer1WeaponWarnings(0);
        setPlayer2WeaponWarnings(0);
        addLog(`${player1Name} got 2nd weapon warning. ${player2Name} gets 1 point!`);
      } else {
        setPlayer1WeaponWarnings(1);
        addLog(`${player1Name} got weapon warning`);
      }
    } else {
      if (player2WeaponWarnings >= 1) {
        setPlayer1Score(prev => prev + 1);
        setPlayer1WeaponWarnings(0);
        setPlayer2WeaponWarnings(0);
        addLog(`${player2Name} got 2nd weapon warning. ${player1Name} gets 1 point!`);
      } else {
        setPlayer2WeaponWarnings(1);
        addLog(`${player2Name} got weapon warning`);
      }
    }
  };

  const resetGame = () => {
    setPlayer1Score(0);
    setPlayer2Score(0);
    setPlayer1OutWarnings(0);
    setPlayer2OutWarnings(0);
    setPlayer1WeaponWarnings(0);
    setPlayer2WeaponWarnings(0);
    setTimeLeft(180);
    setIsTimerRunning(false);
    setWinner(null);
    setLogs([]);
    setCurrentScreen('setup');
    addLog('Game reset');
  };

  const startGame = () => {
    if (player1Name.trim() && player2Name.trim()) {
      setCurrentScreen('game');
      addLog(`Match started: ${player1Name} vs ${player2Name}`);
    }
  };

  // Setup Screen
  if (currentScreen === 'setup') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Thai Fencing Scoreboard</h1>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Player 1 Name</label>
              <input
                type="text"
                value={player1Name}
                onChange={(e) => setPlayer1Name(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter player 1 name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Player 2 Name</label>
              <input
                type="text"
                value={player2Name}
                onChange={(e) => setPlayer2Name(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter player 2 name"
              />
            </div>
            
            <button
              onClick={startGame}
              disabled={!player1Name.trim() || !player2Name.trim()}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
            >
              Start Match
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Logs Screen
  if (currentScreen === 'logs') {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800">Match Logs</h1>
              <button
                onClick={() => setCurrentScreen('game')}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Back to Game
              </button>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {logs.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No logs yet</p>
              ) : (
                logs.map((log, index) => (
                  <div key={index} className="border-b border-gray-200 py-2">
                    <span className="text-sm text-gray-500 mr-4">{log.time}</span>
                    <span className="text-gray-800">{log.message}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Summary Screen
  if (currentScreen === 'summary') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Match Complete!</h1>
          
          {winner && (
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-green-600 mb-4">🏆 {winner} Wins!</h2>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">{player1Name}</h3>
              <div className="text-6xl font-bold text-red-600">{player1Score}</div>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">{player2Name}</h3>
              <div className="text-6xl font-bold text-blue-600">{player2Score}</div>
            </div>
          </div>
          
          <div className="text-center mb-8">
            <p className="text-xl text-gray-600">Final Time: {formatTime(timeLeft)}</p>
          </div>
          
          <div className="flex justify-center space-x-4">
            <button
              onClick={resetGame}
              className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 font-medium"
            >
              New Match
            </button>
            <button
              onClick={() => setCurrentScreen('logs')}
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 font-medium flex items-center"
            >
              <FileText className="w-4 h-4 mr-2" />
              View Logs
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main Game Screen
  return (
    <div className="min-h-screen bg-gray-100 relative">
      {/* Admin Toggle */}
      <button
        onClick={() => setShowAdmin(!showAdmin)}
        className="absolute top-4 left-4 z-10 bg-gray-600 text-white p-2 rounded-md hover:bg-gray-700"
      >
        <Settings className="w-4 h-4" />
      </button>

      {/* Logs Button */}
      <button
        onClick={() => setCurrentScreen('logs')}
        className="absolute top-4 right-4 z-10 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
      >
        <FileText className="w-4 h-4" />
      </button>

      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white border-8 border-black max-w-6xl w-full aspect-video flex flex-col relative">
          
          {/* Top Row - Team Logos and Timer */}
          <div className="flex items-center justify-between w-full px-12 py-6">
            {/* Left Team Logo */}
            <div className="w-24 h-24 flex items-center justify-center">
              <div className="w-16 h-16 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                <div className="w-8 h-12 bg-orange-600 rounded-sm"></div>
              </div>
            </div>

            {/* Timer */}
            <div className="flex flex-col items-center">
              <div className="text-6xl font-bold text-green-500 mb-4">
                {formatTime(timeLeft)}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setIsTimerRunning(!isTimerRunning);
                    addLog(isTimerRunning ? 'Timer paused' : 'Timer started');
                  }}
                  className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
                >
                  {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => {
                    setTimeLeft(180);
                    setIsTimerRunning(false);
                    addLog('Timer reset to 3:00');
                  }}
                  className="bg-gray-600 text-white p-2 rounded-md hover:bg-gray-700"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Team Logo */}
            <div className="w-24 h-24 flex items-center justify-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center border-4 border-yellow-400">
                <div className="w-6 h-8 bg-yellow-400 rounded-sm"></div>
              </div>
            </div>
          </div>

          {/* Player Names */}
          <div className="flex justify-between w-full px-16 mb-4">
            <div className="text-2xl font-bold text-black">{player1Name}</div>
            <div className="text-2xl font-bold text-black">{player2Name}</div>
          </div>

          {/* Warning Indicators */}
          <div className="flex justify-between w-full px-16 mb-4">
            <div className="flex space-x-4">
              {player1OutWarnings > 0 && <AlertCircle className="w-6 h-6 text-red-600" />}
              {player1WeaponWarnings > 0 && <Sword className="w-6 h-6 text-orange-600" />}
            </div>
            <div className="flex space-x-4">
              {player2WeaponWarnings > 0 && <Sword className="w-6 h-6 text-orange-600" />}
              {player2OutWarnings > 0 && <AlertCircle className="w-6 h-6 text-red-600" />}
            </div>
          </div>

          {/* Scores */}
          <div className="flex justify-between items-center w-full px-16 flex-grow">
            <div className="text-9xl font-bold text-red-600">{player1Score}</div>
            <div className="text-9xl font-bold text-blue-600">{player2Score}</div>
          </div>

          {/* Admin Controls */}
          {showAdmin && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white border-2 border-gray-300 rounded-lg p-4 shadow-lg">
              <div className="grid grid-cols-2 gap-4">
                {/* Player 1 Controls */}
                <div className="text-center">
                  <p className="text-sm font-medium mb-2">{player1Name}</p>
                  <div className="flex flex-col space-y-1">
                    <button
                      onClick={() => addScore(1)}
                      className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 flex items-center justify-center"
                    >
                      <Plus className="w-3 h-3 mr-1" /> Score
                    </button>
                    <button
                      onClick={() => addOutWarning(1)}
                      className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700 flex items-center justify-center"
                    >
                      <AlertCircle className="w-3 h-3 mr-1" /> Out
                    </button>
                    <button
                      onClick={() => addWeaponWarning(1)}
                      className="bg-orange-600 text-white px-3 py-1 rounded text-xs hover:bg-orange-700 flex items-center justify-center"
                    >
                      <Sword className="w-3 h-3 mr-1" /> Weapon
                    </button>
                  </div>
                </div>

                {/* Player 2 Controls */}
                <div className="text-center">
                  <p className="text-sm font-medium mb-2">{player2Name}</p>
                  <div className="flex flex-col space-y-1">
                    <button
                      onClick={() => addScore(2)}
                      className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 flex items-center justify-center"
                    >
                      <Plus className="w-3 h-3 mr-1" /> Score
                    </button>
                    <button
                      onClick={() => addOutWarning(2)}
                      className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700 flex items-center justify-center"
                    >
                      <AlertCircle className="w-3 h-3 mr-1" /> Out
                    </button>
                    <button
                      onClick={() => addWeaponWarning(2)}
                      className="bg-orange-600 text-white px-3 py-1 rounded text-xs hover:bg-orange-700 flex items-center justify-center"
                    >
                      <Sword className="w-3 h-3 mr-1" /> Weapon
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThaiFencingScoreboard;