import React, {useState} from 'react';
import {makeStyles} from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import {useForm} from "react-hook-form";
import {Card, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import {login} from "../services/NetworkService";
import {Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {hideLoader, showLoader} from "../store/actions/loader.action";
import {Alert, AlertTitle} from '@material-ui/lab';
import ButtonRouter from "../layout/ButtonRouter";
import {storeJWT, storeRefreshToken} from "../services/NetworkUtils";
import {setUserData} from "../store/actions/context.action";

const useStyles = makeStyles({
    root: {
        display: 'flex',
        margin: '2rem 0',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        textAlign: 'center'
    },
    card: {
        width: '450px',
        padding: '20px',
    },
    avatar: {
        margin: '20px auto 30px auto',
        width: '10rem',
        height: '10rem'
    },
    errorAlert: {
        margin: '5px 0'
    },
    signUpContainer: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
});

function Login() {
    const classes = useStyles();
    const {handleSubmit, register, errors, triggerValidation} = useForm({mode: 'onBlur'});
    const dispatch = useDispatch();
    const [loginError, setLoginError] = useState(false);

    const loggedIn = useSelector(({context}) => context.loggedIN);
    if (loggedIn) {
        return (<Redirect to='/dashboard'/>)
    }

    const onSubmit = async (data) => {
        if (await triggerValidation()) {
            console.log(data);
            dispatch(showLoader());
            setLoginError(false);
            login(data,
                (response) => {
                    storeJWT(response.data.token);
                    storeRefreshToken(response.data.refreshToken);
                    dispatch(setUserData(response.data.user));
                },
                error => {
                    setLoginError(true);
                }).then(() => dispatch(hideLoader()));
        }
    };

    return (
        <div className={classes.root}>
            <Card elevation={3} className={classes.card}>
                <div>
                    <Avatar src='/assets/img/lamavatar.png' className={classes.avatar}/>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2} direction='column'>
                        <Grid item>
                            <TextField
                                id='email'
                                name='email'
                                type='text'
                                label='Email'
                                variant='outlined'
                                error={loginError || errors && errors.email ? true : false}
                                helperText={errors && errors.email ? errors.email.message : ''}
                                fullWidth
                                inputRef={register({required: 'Le mail est obligatoire'})}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                id='password'
                                name='password'
                                variant='outlined'
                                type='password'
                                label='Mot de passe'
                                fullWidth
                                inputRef={register({required: 'Le mot de passe est obligatoire'})}
                                error={loginError || errors && errors.password ? true : false}
                                helperText={errors && errors.password ? errors.password.message : ''}
                            />
                        </Grid>
                        <Grid item hidden={!loginError}>
                            <Alert severity='error'>
                                <AlertTitle>Email ou mot de passe incorrect</AlertTitle>
                            </Alert>
                        </Grid>
                        <Grid item>
                            <Button
                                variant='contained'
                                color='primary'
                                type='submit'
                                fullWidth
                            >
                                Me connecter
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item className={classes.signUpContainer}>
                        <ButtonRouter
                            color='secondary'
                            size='small'
                            to='/sign-up'
                        >Pas encore de compte ?</ButtonRouter>
                    </Grid>
                </form>
            </Card>
        </div>
    );
}

export default Login;
