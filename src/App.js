import React from 'react';
import { makeStyles } from '@mui/styles';
import { AppBar, Toolbar } from '@mui/material';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import theme from './layout/MUITheme';
import Logo from './layout/Logo';
import GlobalLoader from './layout/GlobalLoader';
import MyStoreProvider from './store/MyStoreProvider';
import UserToolbar from './layout/UserToolbar';
import GlobalLoaderFeedback from './layout/GlobalLoaderFeedback';
import RouterHandler from './router/RouterHandler';
import { indigo } from '@mui/material/colors';
import GlobalDrawerButton from './layout/GlobalDrawerButton';
import GlobalDrawer from './layout/GlobalDrawer';
import GlobalChatContainer from './layout/GlobalChatContainer';
import RestoreSessionProvider from './layout/RestoreSessionProvider';

export function getHeaderHeight() {
    return 64;
}

const useStyles = makeStyles({
    root: {
        height: '100vh',
    },
    appBar: {
        height: getHeaderHeight() + 'px',
    },
    container: {
        padding: '0',
    },
    logoContainer: {},
    toolIconsMenu: {
        flexGrow: 1,
    },
    button: {
        backgroundColor: indigo[300],
        margin: '0 5px',
    },
});

function App() {
    const classes = useStyles();
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <MyStoreProvider>
                    <RestoreSessionProvider>
                        <BrowserRouter>
                            <div className={classes.root}>
                                <AppBar position="static" className={classes.appBar}>
                                    <Toolbar>
                                        <div className={classes.logoContainer}>
                                            <Logo />
                                        </div>
                                        <div className={classes.toolIconsMenu}></div>
                                        <UserToolbar />
                                        <GlobalDrawerButton />
                                    </Toolbar>
                                </AppBar>
                                <GlobalLoaderFeedback />
                                <div className={classes.container}>
                                    <RouterHandler />
                                </div>
                                <GlobalLoader />
                            </div>
                            <GlobalDrawer />
                            <GlobalChatContainer />
                        </BrowserRouter>
                    </RestoreSessionProvider>
                </MyStoreProvider>
            </ThemeProvider>
        </StyledEngineProvider>
    );
}

export default App;
