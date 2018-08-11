import React, { Component } from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import App from "./App";


// const drawerWidth = 240;

export default class AppProvider extends Component {


    render() {
        const theme = createMuiTheme({
            palette:
            {
                primary: {
                    main: "#14222D",
                },
                secondary: {
                    main: "#9CB2C0",
                }
            },

        });

        return (
            <MuiThemeProvider theme={theme}>
                <App />
            </MuiThemeProvider>
        );
    }
}