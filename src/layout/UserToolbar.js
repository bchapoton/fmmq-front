import React from 'react';
import {makeStyles} from "@mui/styles";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';
import {teal} from "@mui/material/colors";
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import {clearUserData} from "../store/actions/context.action";
import {ROUTE_LOGIN, ROUTE_SIGN_UP} from "../router/routes";
import {Tooltip} from "@mui/material";

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
    const navigate = useNavigate();

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
                            navigate(ROUTE_LOGIN);
                        }}
                        size="large">
                        <DirectionsRunIcon/>
                    </IconButton>
                </Tooltip>
            </React.Fragment>
        );
    } else {
        return (
            <div className={classes.buttonContainer}>
                <Tooltip title='Connexion'>
                    <IconButton
                        className={classes.button}
                        onClick={() => navigate(ROUTE_LOGIN)}
                        size="large">
                        <PersonIcon/>
                    </IconButton>
                </Tooltip>
                <Tooltip title='Créer un compte'>
                    <IconButton
                        className={classes.button}
                        onClick={() => navigate(ROUTE_SIGN_UP)}
                        size="large">
                        <AssignmentIcon/>
                    </IconButton>
                </Tooltip>
            </div>
        );
    }
}

export default UserToolbar;
