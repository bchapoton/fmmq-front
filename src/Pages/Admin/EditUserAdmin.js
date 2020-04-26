import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import {useForm} from "react-hook-form";
import Button from "@material-ui/core/Button";
import {useDispatch} from "react-redux";
import {ROUTE_ADMIN_USERS} from "../../router/routes";
import ButtonRouter from "../../layout/ButtonRouter";
import {getUserById, putUserRole} from "../../services/UserService";
import {hideLoader, showLoader} from "../../store/actions/loader.action";
import {useParams} from "react-router-dom";
import {ROLE_ADMIN, ROLE_CONTRIBUTOR, ROLE_PLAYER} from "../../router/roles";
import history from "../../layout/utils/history";

const useStyles = makeStyles({
    root: {
        padding: '1rem',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
});

function EditUserAdmin() {
    const classes = useStyles();
    const {id} = useParams();
    const {handleSubmit, register, setValue} = useForm({mode: 'onBlur'});
    const dispatch = useDispatch();
    const [user, setUser] = useState({});

    useEffect(() => {
        dispatch(showLoader());
        getUserById(id)
            .then(response => {
                setUser(response.data);
                setValue('role', response.data.role);
            })
            .catch(error => {
                console.log(error);
            })
            .then(() => {
                dispatch(hideLoader());
            });
    }, []);

    const onSubmit = (data) => {
        console.log(data);
        putUserRole(id, data).then(response => {
            history.push(ROUTE_ADMIN_USERS);
        });
    };

    const roles = [ROLE_PLAYER, ROLE_CONTRIBUTOR, ROLE_ADMIN];

    return (
        <div className={classes.root}>
            <h1>Edition utilisateur {user.email}</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2} direction='column'>
                    <Grid item>
                        <label for='role'>Rôle</label>
                        <select name="role" id="role" ref={register}>
                            {roles.map(role => {
                                return (<option key={role} value={role}>{role}</option>);
                            })}
                        </select>
                    </Grid>
                    <Grid item className={classes.buttonContainer}>
                        <ButtonRouter
                            to={ROUTE_ADMIN_USERS}
                            variant='contained'
                            color='secondary'
                            className={classes.button}
                        >
                            annuler
                        </ButtonRouter>
                        <Button
                            variant='contained'
                            color='primary'
                            type='submit'
                            className={classes.button}
                        >
                            Enregistrer
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}

export default EditUserAdmin;
