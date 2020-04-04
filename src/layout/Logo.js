import React, {useState} from 'react';
import {makeStyles} from "@material-ui/styles";
import {Slide} from "@material-ui/core";
import {green, red} from "@material-ui/core/colors";
import {Link} from "react-router-dom";
import {ROUTE_HOME} from "../router/routes";

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
    }
});

function Logo() {
    const classes = useStyles();
    const [randomLogo, setRandomLogo] = useState('');

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
        <Link to={ROUTE_HOME} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={classes.logo}>
            F{randomLogo}MMQ
        </Link>
    );
}

export default Logo;
