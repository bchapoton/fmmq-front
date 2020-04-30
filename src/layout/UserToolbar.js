import React from 'react';
import {makeStyles} from "@material-ui/styles";
import history from './utils/history'
import {useDispatch, useSelector} from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import PersonIcon from '@material-ui/icons/Person';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {teal} from "@material-ui/core/colors";
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import {clearUserData} from "../store/actions/context.action";
import {ROUTE_LOGIN, ROUTE_SIGN_UP} from "../router/routes";
import {Tooltip} from "@material-ui/core";

const useStyles = makeStyles({
    buttonContainer: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    avatar: {
        backgroundColor: teal[200],
        marginRight: '5px'
    },
    button: {
        color: 'white',
        margin: '0 5px'
    },
    userContainer: {
        display: 'flex',
        alignItems: 'center'
    }
});

function UserToolbar() {
    const classes = useStyles();
    const context = useSelector(({context}) => context);
    const dispatch = useDispatch();

    if (context.loggedIN) {
        return (
            <React.Fragment>
                <div className={classes.userContainer}>
                    <Avatar className={classes.avatar}>
                        {context.user.nickname ? context.user.nickname.substring(0, 1).toUpperCase() : 'U'}
                    </Avatar>
                    <Typography>{context.user.nickname}</Typography>
                </div>
                <Tooltip title='Déconnexion'>
                    <IconButton
                        className={classes.button}
                        onClick={(e) => {
                            dispatch(clearUserData());
                            history.push(ROUTE_LOGIN);
                        }}
                    >
                        <DirectionsRunIcon/>
                    </IconButton>
                </Tooltip>
            </React.Fragment>
        );
    } else {
        return (
            <div className={classes.buttonContainer}>
                <Tooltip title='Connexion'>
                    <IconButton className={classes.button} onClick={() => history.push(ROUTE_LOGIN)}>
                        <PersonIcon/>
                    </IconButton>
                </Tooltip>
                <Tooltip title='Créer un compte'>
                    <IconButton className={classes.button} onClick={() => history.push(ROUTE_SIGN_UP)}>
                        <AssignmentIcon/>
                    </IconButton>
                </Tooltip>
            </div>
        );
    }
}

export default UserToolbar;
