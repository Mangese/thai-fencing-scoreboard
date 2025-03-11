import React from "react"
import { styles } from "../styles"

function MainContent({
	timer,
	isTimerRunning,
	toggleTimer,
	matchEnded,
	resetMatch,
}) {
	return (
		<div style={{ ...styles.timerSection, textAlign: "center" }}>
			<button style={styles.timerButton} onClick={toggleTimer}>
				{isTimerRunning ? "Pause" : "Start"}
			</button>
			<div style={styles.timer}>{timer}</div>
			{matchEnded && (
				<button style={styles.resetButton} onClick={resetMatch}>
					Reset
				</button>
			)}
		</div>
	)
}

export default MainContent
