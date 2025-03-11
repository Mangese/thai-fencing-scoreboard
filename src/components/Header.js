import React from "react"
import mahidol from "../mahidol.png"
import { styles } from "../styles"

function Header() {
	return (
		<div style={styles.header}>
			<div style={styles.logo}>
				<img src={mahidol} alt="Left Logo" style={styles.logoImage} />
			</div>
			<div style={styles.emblem}>
				<img src={mahidol} alt="Emblem" style={styles.emblemImage} />
			</div>
			<div style={styles.logo}>
				<img src={mahidol} alt="Right Logo" style={styles.logoImage} />
			</div>
		</div>
	)
}

export default Header
