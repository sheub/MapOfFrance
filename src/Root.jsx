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

            // root: {
            //     display: 'flex',
            // },
            // toolbar: {
            //     paddingRight: 24, // keep right padding when drawer closed
            // },
            // toolbarIcon: {
            //     display: 'flex',
            //     alignItems: 'center',
            //     justifyContent: 'flex-end',
            //     padding: '0 8px',
            //     ...theme.mixins.toolbar,
            // },
            // appBar: {
            //     zIndex: theme.zIndex.drawer + 1,
            //     transition: theme.transitions.create(['width', 'margin'], {
            //         easing: theme.transitions.easing.sharp,
            //         duration: theme.transitions.duration.leavingScreen,
            //     }),
            // },
            // appBarShift: {
            //     marginLeft: drawerWidth,
            //     width: `calc(100% - ${drawerWidth}px)`,
            //     transition: theme.transitions.create(['width', 'margin'], {
            //         easing: theme.transitions.easing.sharp,
            //         duration: theme.transitions.duration.enteringScreen,
            //     }),
            // },
            // menuButton: {
            //     marginLeft: 12,
            //     marginRight: 36,
            // },
            // menuButtonHidden: {
            //     display: 'none',
            // },
            // title: {
            //     flexGrow: 1,
            // },
            // drawerPaper: {
            //     position: 'relative',
            //     whiteSpace: 'nowrap',
            //     width: drawerWidth,
            //     transition: theme.transitions.create('width', {
            //         easing: theme.transitions.easing.sharp,
            //         duration: theme.transitions.duration.enteringScreen,
            //     }),
            // },
            // drawerPaperClose: {
            //     overflowX: 'hidden',
            //     transition: theme.transitions.create('width', {
            //         easing: theme.transitions.easing.sharp,
            //         duration: theme.transitions.duration.leavingScreen,
            //     }),
            //     width: theme.spacing.unit * 7,
            //     [theme.breakpoints.up('sm')]: {
            //         width: theme.spacing.unit * 9,
            //     },
            // },
            // appBarSpacer: theme.mixins.toolbar,
            // content: {
            //     flexGrow: 1,
            //     padding: theme.spacing.unit * 3,
            //     height: '100vh',
            //     overflow: 'auto',
            // },
            // chartContainer: {
            //     marginLeft: -22,
            // },
            // tableContainer: {
            //     height: 320,
            // }

        });

        return (
            <MuiThemeProvider theme={theme}>
                <App />
            </MuiThemeProvider>
        );
    }
}