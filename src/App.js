import React from 'react';
import {makeStyles} from "@material-ui/styles";
import {AppBar, MuiThemeProvider, Toolbar} from "@material-ui/core";
import {Router} from "react-router-dom";
import MUITheme from "./layout/MUITheme";
import Logo from "./layout/Logo";
import GlobalLoader from "./layout/GlobalLoader";
import MyStoreProvider from "./store/MyStoreProvider";
import UserToolbar from "./layout/UserToolbar";
import history from './layout/utils/history'
import GlobalLoaderFeedback from "./layout/GlobalLoaderFeedback";
import RestoreSessionProvider from "./layout/RestoreSessionProvider";
import RouterHandler from "./router/RouterHandler";

const useStyles = makeStyles({
    root: {
        position: 'relative',
    },
    container: {
        padding: '0'
    },
    logoContainer: {
        flexGrow: 1
    }
});

function App() {
    const classes = useStyles();

    return (
        <MuiThemeProvider theme={MUITheme}>
            <MyStoreProvider>
                <RestoreSessionProvider>
                    <div className={classes.root}>
                        <Router history={history}>
                            <AppBar position='static'>
                                <Toolbar>
                                    <div className={classes.logoContainer}>
                                        <Logo/>
                                    </div>
                                    <UserToolbar/>
                                </Toolbar>
                            </AppBar>
                            <GlobalLoaderFeedback/>
                            <div className={classes.container}>
                                <RouterHandler/>
                            </div>
                        </Router>
                        <GlobalLoader/>
                    </div>
                </RestoreSessionProvider>
            </MyStoreProvider>
        </MuiThemeProvider>
    );
}

export default App;
