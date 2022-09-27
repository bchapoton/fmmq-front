import React from 'react';
import { makeStyles } from '@mui/styles';
import ButtonContainer from '../layout/ButtonContainer';
import ButtonRouter from '../layout/ButtonRouter';
import { ROUTE_DASHBOARD, ROUTE_LOGIN } from '../router/routes';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
    root: {
        padding: '1rem',
        textAlign: 'center',
    },
    image: {
        height: '70vh',
        maxHeight: '522px',
    },
});

function NotFound() {
    const classes = useStyles();
    const loggedIN = useSelector(({ context }) => context.loggedIN);

    return (
        <div className={classes.root}>
            <ButtonContainer>
                <ButtonRouter to={loggedIN ? ROUTE_DASHBOARD : ROUTE_LOGIN}>Retour à l'accueil</ButtonRouter>
            </ButtonContainer>
            <img className={classes.image} alt="Page not found" src="/assets/img/404.jpg" />
        </div>
    );
}

export default NotFound;
