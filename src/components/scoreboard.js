import React, { useState, useEffect } from "react";
import mahidol from "./mahidol.png"; // Assuming your logo image is named 'mahidol.png'

const styles = {
  container: {
    background: "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  content: {
    width: "100%",
    maxWidth: "800px", // Optional: Set a maximum width for larger screens
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    marginBottom: "30px",
  },
  logo: {
    textAlign: "center",
  },
  logoImage: {
    maxWidth: "100px",
    maxHeight: "100px",
  },
  emblem: {
    width: "150px",
    height: "150px",
    overflow: "hidden",
    borderRadius: "50%",
    border: "3px solid gold",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
  },
  emblemImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  playerSection: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  player: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  name: {
    fontSize: "2em",
    marginBottom: "10px",
  },
  indicator: {
    fontSize: "1.2em",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  buttons: {
    display: "flex",
    marginTop: "5px",
  },
  scoreCircle: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    border: "2px solid gray",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
    fontSize: "3em",
    fontWeight: "bold",
    color: "white",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
  },
  timerSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "30px",
  },
  timerButton: {
    fontSize: "1em",
    padding: "5px 10px",
    marginBottom: "10px",
  },
  timer: {
    fontSize: "3em",
    fontWeight: "bold",
    color: "orange",
    textShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
  },
  resetButton: {
    fontSize: "1em",
    padding: "10px 20px",
  },
};

function App() {
  const [leftScore, setLeftScore] = useState(0);
  const [rightScore, setRightScore] = useState(0);
  const [timer, setTimer] = useState("3:00");
  const [matchEnded, setMatchEnded] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    let timeParts = timer.split(":");
    let minutes = parseInt(timeParts[0]);
    let seconds = parseInt(timeParts[1]);

    if (isTimerRunning && (minutes > 0 || seconds > 0)) {
      const id = setInterval(() => {
        if (seconds > 0) {
          setTimer(
            `${minutes.toString().padStart(2, "0")}:${(seconds - 1)
              .toString()
              .padStart(2, "0")}`
          );
          seconds--;
        } else if (minutes > 0) {
          setTimer(
            `${(minutes - 1).toString().padStart(2, "0")}:${"59".padStart(
              2,
              "0"
            )}`
          );
          minutes--;
          seconds = 59;
        } else {
          clearInterval(id);
          setIsTimerRunning(false);
        }
      }, 1000);
      setIntervalId(id);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isTimerRunning, timer]);

  const handleLeftScoreChange = (amount) => {
    if (!matchEnded && leftScore < 5) {
      setLeftScore((prevScore) => {
        const score = prevScore + amount;
        if (score === 5) {
          setMatchEnded(true);
          setIsTimerRunning(false);
        }
        return score;
      });
    }
  };

  const handleRightScoreChange = (amount) => {
    if (!matchEnded && rightScore < 5) {
      setRightScore((prevScore) => {
        const score = prevScore + amount;
        if (score === 5) {
          setMatchEnded(true);
          setIsTimerRunning(false);
        }
        return score;
      });
    }
  };

  const resetMatch = () => {
    setLeftScore(0);
    setRightScore(0);
    setTimer("3:00");
    setMatchEnded(false);
    setIsTimerRunning(false);
  };

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.header}>
          <div style={styles.logo}>
            <img src={mahidol} alt="Left Logo" style={styles.logoImage} />
          </div>
          <div style={styles.emblem}>
            <img
              src={mahidol}
              alt="Emblem"
              style={styles.emblemImage}
            />
          </div>
          <div style={styles.logo}>
            <img src={mahidol} alt="Right Logo" style={styles.logoImage} />
          </div>
        </div>
        <div style={styles.playerSection}>
          <div style={styles.player}>
            <div style={styles.name}>กนกวรรณ</div>
            <div style={styles.indicator}>
              O / X
              {!matchEnded && (
                <div style={styles.buttons}>
                  <button
                    style={{
                      fontSize: "0.8em",
                      margin: "5px",
                      padding: "5px 10px",
                    }}
                    onClick={() => handleLeftScoreChange(1)}
                  >
                    +1
                  </button>
                  <button
                    style={{
                      fontSize: "0.8em",
                      margin: "5px",
                      padding: "5px 10px",
                    }}
                    onClick={() => handleLeftScoreChange(-1)}
                  >
                    -1
                  </button>

                </div>
              )}
            </div>
            <div style={styles.scoreCircle}>{leftScore}</div>
          </div>
          <div style={styles.timerSection}>
            <button style={styles.timerButton} onClick={toggleTimer}>
              {isTimerRunning ? "Pause" : "Start"}
            </button>
            <div style={styles.timer}>{timer}</div>
          </div>
          <div style={styles.player}>
            <div style={styles.name}>กนกลักษณ์</div>
            <div style={styles.indicator}>
            {!matchEnded && (
                <div style={styles.buttons}>
                  <button
                    style={{
                      fontSize: "0.8em",
                      margin: "5px",
                      padding: "5px 10px",
                    }}
                    onClick={() => handleRightScoreChange(1)}
                  >
                    ออกนอกวง
                  </button>
                  <button
                    style={{
                      fontSize: "0.8em",
                      margin: "5px",
                      padding: "5px 10px",
                    }}
                    onClick={() => handleRightScoreChange(1)}
                  >
                    ดาบหลุด
                  </button>
                  <button
                    style={{
                      fontSize: "0.8em",
                      margin: "5px",
                      padding: "5px 10px",
                    }}
                    onClick={() => handleRightScoreChange(1)}
                  >
                    เตือน
                  </button>
                </div>
              )}
              {!matchEnded && (
                <div style={styles.buttons}>
                  <button
                    style={{
                      fontSize: "0.8em",
                      margin: "5px",
                      padding: "5px 10px",
                    }}
                    onClick={() => handleRightScoreChange(1)}
                  >
                    +1
                  </button>
                </div>
              )}
            </div>
            <div style={styles.scoreCircle}>{rightScore}</div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          {matchEnded && (
            <button style={styles.resetButton} onClick={resetMatch}>
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
