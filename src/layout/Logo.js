import React from 'react';
import {makeStyles} from "@mui/styles";
import {green} from "@mui/material/colors";
import {Link} from "react-router-dom";
import {ROUTE_DASHBOARD, ROUTE_LOGIN} from "../router/routes";
import {useSelector} from "react-redux";

const useStyles = makeStyles({
    logo: {
        fontWeight: 'bold',
        padding: '15px',
        color: 'white',
        textDecoration: 'none',
        cursor: 'pointer'
    },
    RCFlag: {
        color: green[500],
        fontSize: '11px',
        paddingLeft: '10px',
    }
});

function Logo() {
    const classes = useStyles();
    const loggedIN = useSelector(({context}) => context.loggedIN);

    return (
        <Link to={loggedIN ? ROUTE_DASHBOARD : ROUTE_LOGIN} className={classes.logo}>
            FMMQ<span className={classes.RCFlag}>ReleaseCandidate 0.9</span>
        </Link>
    );
}

export default Logo;
