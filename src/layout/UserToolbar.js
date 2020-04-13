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
                <IconButton
                    className={classes.button}
                    onClick={(e) => {
                        dispatch(clearUserData());
                    }}
                >
                    <DirectionsRunIcon/>
                </IconButton>
            </React.Fragment>
        );
    } else {
        return (
            <div className={classes.buttonContainer}>
                <IconButton className={classes.button} onClick={() => history.push(ROUTE_LOGIN)}>
                    <PersonIcon/>
                </IconButton>
                <IconButton className={classes.button} onClick={() => history.push(ROUTE_SIGN_UP)}>
                    <AssignmentIcon/>
                </IconButton>
            </div>
        );
    }
}

export default UserToolbar;
