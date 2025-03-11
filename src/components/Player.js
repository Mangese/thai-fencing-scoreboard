import React from "react"
import { styles } from "../styles"
import mahidol from "../mahidol.png"

function LeftPlayer({ name, score, handleScoreChange, matchEnded }) {
	return (
		<div style={{ ...styles.player, textAlign: "center" }}>
			<div style={styles.header}>
				<div style={styles.logo}>
					<img src={mahidol} alt="Left Logo" style={styles.logoImage} />
				</div>
			</div>
			<div style={styles.name}>{name} </div>
			<div style={styles.indicator}>
				{!matchEnded && (
					<div style={styles.buttons}>
						<button
							style={{ fontSize: "0.8em", margin: "5px", padding: "5px 10px" }}
							onClick={() => handleScoreChange(1)}
						>
							+1
						</button>
						<button
							style={{ fontSize: "0.8em", margin: "5px", padding: "5px 10px" }}
							onClick={() => handleScoreChange(-1)}
						>
							-1
						</button>
					</div>
				)}
			</div>
			<div style={styles.scoreCircle}>{score}</div>
		</div>
	)
}

export default LeftPlayer
