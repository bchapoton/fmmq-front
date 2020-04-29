import React, {useState} from 'react';
import {makeStyles} from "@material-ui/styles";
import {Slide} from "@material-ui/core";
import {green, red} from "@material-ui/core/colors";
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
    logoFuck: {
        color: red[500]
    },
    logoFree: {
        color: green[500]
    },
    RCFlag: {
        color: green[500],
        fontSize: '11px'
    }
});

function Logo() {
    const classes = useStyles();
    const [randomLogo, setRandomLogo] = useState('');
    const loggedIN = useSelector(({context}) => context.loggedIN);


    const onMouseEnter = (e) => {
        let text = 'uck';
        let className = classes.logoFuck;
        const rand = Math.random();
        if (rand < 0.5) {
            text = 'ree';
            className = classes.logoFree;
        }
        setRandomLogo((
            <Slide direction='left' in={true} mountOnEnter unmountOnExit timeout={1000}>
                <span className={className}>{text}</span>
            </Slide>
        ));
    };

    const onMouseLeave = (e) => {
        setRandomLogo('');
    };

    return (
        <Link to={loggedIN ? ROUTE_DASHBOARD : ROUTE_LOGIN} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
              className={classes.logo}>
            F{randomLogo}MMQ<span className={classes.RCFlag}>ReleaseCandidate 0.9</span>
        </Link>
    );
}

export default Logo;
