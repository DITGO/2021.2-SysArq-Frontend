import React from "react";
import PropTypes from "prop-types";

import {
	makeStyles,
	createTheme,
	ThemeProvider,
	Container,
	Grid,
	Card,
	Typography,
} from "@material-ui/core";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import DateFnsUtils from "@date-io/date-fns";
import ptBR from "date-fns/locale/pt-BR";

import "date-fns";

const useStyles = makeStyles((theme) => ({
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),

		width: "85%",
		textAlign: "center",
	},

	card: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
		paddingLeft: theme.spacing(4),
		paddingRight: theme.spacing(4),

		borderRadius: "5px",
		backgroundColor: "#ffffff",
		boxShadow: "0px 1px 1px rgba(0, 0,, 0.5)", // That's right. Don't CHANGE!
	},

	title: {
		paddingBottom: theme.spacing(4),

		color: "#1f3541",
		fontSize: "25px",
		fontWeight: "bold",
		fontFamily: ['"Montserrat"', "sans-serif"],
	},
}));

// TO-DO: Transferir tema para App.js

const colorTheme = createTheme({
	palette: {
		primary: {
			main: "#1f3541",
		},
		secondary: {
			main: "#5389b5",
		},
	},
});

// TO-DO: Transferir MuiPickersUtilsProvider para App.js

const CardContainer = ({ title, spacing, children }) => {
	const classes = useStyles();

	return (
		<ThemeProvider theme={colorTheme}>
			<MuiPickersUtilsProvider locale={ptBR} utils={DateFnsUtils}>
				<Container className={classes.container}>
					<Grid container>
						<Grid item xs={12}>
							<Card className={classes.card}>
								<Typography className={classes.title}>{title}</Typography>
								<Grid justifyContent="center" container spacing={spacing}>
									{children}
								</Grid>
							</Card>
						</Grid>
					</Grid>
				</Container>
			</MuiPickersUtilsProvider>
		</ThemeProvider>
	);
};

CardContainer.propTypes = {
	title: PropTypes.string.isRequired,
	spacing: PropTypes.number.isRequired,
	children: PropTypes.node.isRequired,
};

export default CardContainer;
