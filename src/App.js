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
import IconButton from "@material-ui/core/IconButton";
import DashboardIcon from '@material-ui/icons/Dashboard';
import {generateRoute, ROUTE_DASHBOARD} from "./router/routes";


const useStyles = makeStyles({
    root: {
        position: 'relative',
    },
    container: {
        padding: '0'
    },
    logoContainer: {},
    toolIconsMenu: {
        flexGrow: 1
    }
});

function App() {
    const classes = useStyles();
    console.log(theme);
    return (
        <MuiThemeProvider theme={theme}>
            <MyStoreProvider>
                <RestoreSessionProvider>
                    <div className={classes.root}>
                        <Router history={history}>
                            <AppBar position='static'>
                                <Toolbar>
                                    <div className={classes.logoContainer}>
                                        <Logo/>
                                    </div>
                                    <div className={classes.toolIconsMenu}>
                                        <IconButton
                                            onClick={(e) => history.push(generateRoute(ROUTE_DASHBOARD))}
                                        >
                                            <DashboardIcon/>
                                        </IconButton>
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
