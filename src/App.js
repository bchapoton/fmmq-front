import React from 'react';
import {makeStyles} from "@material-ui/styles";
import {AppBar, MuiThemeProvider, Toolbar} from "@material-ui/core";
import {Router} from "react-router-dom";
import theme from "./layout/MUITheme";
import Logo from "./layout/Logo";
import GlobalLoader from "./layout/GlobalLoader";
import MyStoreProvider from "./store/MyStoreProvider";
import UserToolbar from "./layout/UserToolbar";
import history from './layout/utils/history'
import GlobalLoaderFeedback from "./layout/GlobalLoaderFeedback";
import RestoreSessionProvider from "./layout/RestoreSessionProvider";
import RouterHandler from "./router/RouterHandler";
import {indigo} from "@material-ui/core/colors";
import GlobalDrawerButton from "./layout/GlobalDrawerButton";
import GlobalDrawer from "./layout/GlobalDrawer";
import GlobalChatContainer from "./layout/GlobalChatContainer";

const headerHeight = 64;

const useStyles = makeStyles({
    root: {
        height: '100vh'
    },
    appBar: {
      height: headerHeight + 'px'
    },
    container: {
        height: `calc(100vh - ${headerHeight}px)`,
        overflow: 'auto',
        padding: '0'
    },
    logoContainer: {},
    toolIconsMenu: {
        flexGrow: 1
    },
    button: {
        backgroundColor: indigo[300],
        margin: '0 5px'
    }
});

function App() {
    const classes = useStyles();
    return (
        <MuiThemeProvider theme={theme}>
            <MyStoreProvider>
                <RestoreSessionProvider>
                    <div className={classes.root}>
                        <Router history={history}>
                            <AppBar position='static' className={classes.appBar}>
                                <Toolbar>
                                    <GlobalDrawerButton/>
                                    <div className={classes.logoContainer}>
                                        <Logo/>
                                    </div>
                                    <div className={classes.toolIconsMenu}>
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
                    <GlobalDrawer/>
                    <GlobalChatContainer/>
                </RestoreSessionProvider>
            </MyStoreProvider>
        </MuiThemeProvider>
    );
}

export default App;
