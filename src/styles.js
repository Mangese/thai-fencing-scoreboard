export const styles = {
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
		maxWidth: "100%",
		display: "flex",
		flexDirection: "row", // Change to row for 3 columns
		justifyContent: "space-around",
		alignItems: "center", // Align items to the top
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
		maxWidth: "150px",
		maxHeight: "150px",
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
		color: "white",
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
}
