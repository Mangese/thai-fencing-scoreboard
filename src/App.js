import React, { useState, useEffect } from "react"
import Player from "./components/Player"
import MainContent from "./components/MainContent"
import { styles } from "./styles"

function App() {
	const [leftScore, setLeftScore] = useState(0)
	const [rightScore, setRightScore] = useState(0)
	const [timer, setTimer] = useState("3:00")
	const [matchEnded, setMatchEnded] = useState(false)
	const [isTimerRunning, setIsTimerRunning] = useState(false)
	const [intervalId, setIntervalId] = useState(null)

	useEffect(() => {
		let timeParts = timer.split(":")
		let minutes = parseInt(timeParts[0])
		let seconds = parseInt(timeParts[1])

		if (isTimerRunning && (minutes > 0 || seconds > 0)) {
			const id = setInterval(() => {
				if (seconds > 0) {
					setTimer(
						`${minutes.toString().padStart(2, "0")}:${(seconds - 1)
							.toString()
							.padStart(2, "0")}`
					)
					seconds--
				} else if (minutes > 0) {
					setTimer(
						`${(minutes - 1).toString().padStart(2, "0")}:${"59".padStart(
							2,
							"0"
						)}`
					)
					minutes--
					seconds = 59
				} else {
					clearInterval(id)
					setIsTimerRunning(false)
				}
			}, 1000)
			setIntervalId(id)
		} else {
			clearInterval(intervalId)
		}

		return () => clearInterval(intervalId)
	}, [isTimerRunning, timer])

	const handleLeftScoreChange = (amount) => {
		if (leftScore === 0 && amount < 1) {
			return
		}

		if (!matchEnded && leftScore < 5) {
			setLeftScore((prevScore) => {
				const score = prevScore + amount
				if (score === 5) {
					setMatchEnded(true)
					setIsTimerRunning(false)
				}
				return score
			})
		}
	}

	const handleRightScoreChange = (amount) => {
		if (rightScore === 0 && amount < 1) {
			return
		}
		if (!matchEnded && rightScore < 5) {
			setRightScore((prevScore) => {
				const score = prevScore + amount
				if (score === 5) {
					setMatchEnded(true)
					setIsTimerRunning(false)
				}
				return score
			})
		}
	}

	const resetMatch = () => {
		setLeftScore(0)
		setRightScore(0)
		setTimer("3:00")
		setMatchEnded(false)
		setIsTimerRunning(false)
	}

	const toggleTimer = () => {
		setIsTimerRunning(!isTimerRunning)
	}

	return (
		<div style={styles.container}>
			<div style={styles.content}>
				<Player
					name="กนกวรรณ"
					score={leftScore}
					handleScoreChange={handleLeftScoreChange}
					matchEnded={matchEnded}
				/>
				<MainContent
					timer={timer}
					isTimerRunning={isTimerRunning}
					toggleTimer={toggleTimer}
					matchEnded={matchEnded}
					resetMatch={resetMatch}
				/>
				<Player
					name="กมลพร"
					score={rightScore}
					handleScoreChange={handleRightScoreChange}
					matchEnded={matchEnded}
				/>
			</div>
		</div>
	)
}

export default App
