import React, {useState} from 'react';
import {makeStyles} from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import {useForm} from "react-hook-form";
import {Card, CardActions, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {signUp} from "../services/NetworkService";
import {Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {hideLoader, showLoader} from "../store/actions/loader.action";
import ButtonRouter from "../layout/ButtonRouter";
import Typography from "@material-ui/core/Typography";
import {cyan} from "@material-ui/core/colors";
import {ROUTE_DASHBOARD, ROUTE_LOGIN} from "../router/routes";

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
        width: '500px',
        padding: '20px',
    },
    registeredCard: {
        width: '400px',
        padding: '1rem'
    },
    registeredAction: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    cguLink: {
        color: cyan[500]
    }
});

function SignUp() {
    const classes = useStyles();
    const {handleSubmit, register, errors, clearError, triggerValidation, watch, setError} = useForm({mode: 'onBlur'});
    const dispatch = useDispatch();
    const [registered, setRegistered] = useState(false);

    const loggedIn = useSelector(({context}) => context.loggedIN);
    if (loggedIn) {
        return (<Redirect to={ROUTE_DASHBOARD}/>)
    }

    const onSubmit = async (data) => {
        if (await triggerValidation()) {
            console.log(data);
            clearError();
            dispatch(showLoader());
            signUp(data, (response) => {
                    setRegistered(true);
                },
                error => {
                    console.log(error.response.data);
                    if (error.response.data && error.response.data.errors) {
                        error.response.data.errors.forEach(function (item) {
                            setError(item.field, "duplicate", item.message);
                        });
                    }
                }).then(() => dispatch(hideLoader()));
        }
    };

    if (registered) {
        return (
            <div className={classes.root}>
                <Card className={classes.registeredCard} elevation={3}>
                    <h3>Bienvenue sur FMMQ !</h3>
                    <Typography>
                        Tu peux dès à présent te connecter et venir jouer !
                    </Typography>
                    <CardActions className={classes.registeredAction}>
                        <ButtonRouter to={ROUTE_LOGIN} color='primary' variant='contained'>Se connecter</ButtonRouter>
                    </CardActions>
                </Card>
            </div>
        );
    }

    return (
        <div className={classes.root}>
            <Card elevation={3} className={classes.card}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2} direction='column'>
                        <Grid item>
                            <TextField
                                id='nickname'
                                name='nickname'
                                type='text'
                                label='Pseudo'
                                variant='outlined'
                                error={errors && errors.nickname ? true : false}
                                helperText={errors && errors.nickname ? errors.nickname.message : ''}
                                fullWidth
                                inputRef={register({required: "Le pseudo est obligatoire"})}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                id='email'
                                name='email'
                                type='text'
                                label='Email'
                                variant='outlined'
                                error={errors && errors.email ? true : false}
                                helperText={errors && errors.email ? errors.email.message : ''}
                                fullWidth
                                inputRef={register({
                                    required: "L'email est obligatoire",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: "Le format de l'email est invalide"
                                    }
                                })}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                id='emailConfirm'
                                name='emailConfirm'
                                type='text'
                                label='Confirmer votre email'
                                variant='outlined'
                                error={errors && errors.emailConfirm ? true : false}
                                helperText={errors && errors.emailConfirm ? errors.emailConfirm.message : ''}
                                fullWidth
                                inputRef={register({
                                    required: "Vous devez confirmer votre email",
                                    validate: (value) => value === watch("email") || "L'email' et la confirmation doivent être identique"
                                })}
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
                                error={errors && errors.password ? true : false}
                                helperText={errors && errors.password ? errors.password.message : ''}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                id='passwordConfirm'
                                name='passwordConfirm'
                                variant='outlined'
                                type='password'
                                label='Confirmer votre mot de passe'
                                fullWidth
                                inputRef={register({
                                    required: "Vous devez confirmer votre mot de passe",
                                    validate: (value) => value === watch("password") || 'Le mot de passe et la confirmation doivent être identique'
                                })}
                                error={errors && errors.passwordConfirm ? true : false}
                                helperText={errors && errors.passwordConfirm ? errors.passwordConfirm.message : ''}
                            />
                        </Grid>
                        <Grid item>
                            <Button
                                variant='contained'
                                color='primary'
                                type='submit'
                                fullWidth
                            >
                                M'ENREGISTRER
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Card>
        </div>
    );
}

export default SignUp;
