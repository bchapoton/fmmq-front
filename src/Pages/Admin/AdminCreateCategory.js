import React from 'react'
import {makeStyles} from "@material-ui/core/styles";
import {useForm} from "react-hook-form";
import {hideLoader, showLoader} from "../../store/actions/loader.action";
import {useDispatch} from "react-redux";
import {FormControlLabel, TextField} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonRouter from "../../layout/ButtonRouter";
import {ROUTE_ADMIN_CATEGORIES} from "../../router/routes";
import {createCategoriesAdmin} from "../../services/AdminService";
import history from "../../layout/utils/history";
import Checkbox from "@material-ui/core/Checkbox";


const useStyle = makeStyles({
    root: {
        padding: '1rem'
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    button: {
        marginLeft: '10px'
    }
});

function AdminCreateCategory() {
    const classes = useStyle();
    const dispatch = useDispatch();
    const {handleSubmit, register, errors, clearError, triggerValidation, setError} = useForm({mode: 'onBlur'});

    const onSubmit = async (data) => {
        if (await triggerValidation()) {
            console.log(data);
            clearError();
            dispatch(showLoader());
            createCategoriesAdmin(data)
                .then((response => {
                    dispatch(hideLoader());
                    history.push(ROUTE_ADMIN_CATEGORIES);
                }))
                .catch(error => {
                    console.log('error : ' + error.message);
                })
                .then(() => {
                    dispatch(hideLoader());
                });
        }
    };

    return (
        <div className={classes.root}>
            <h1>Nouvel import de musiques</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2} direction='column'>
                    <Grid item>
                        <TextField
                            id='label'
                            name='label'
                            type='text'
                            label='Libellé'
                            variant='outlined'
                            error={errors && errors.label ? true : false}
                            helperText={errors && errors.label ? errors.label.message : ''}
                            fullWidth
                            inputRef={register(
                                {
                                    required: "Le libellé est obligatoire"
                                }
                            )}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id='description'
                            name='description'
                            type='text'
                            multiline={true}
                            rows={4}
                            label='Description'
                            variant='outlined'
                            error={errors && errors.description ? true : false}
                            helperText={errors && errors.description ? errors.description.message : ''}
                            fullWidth
                            inputRef={register(
                                {
                                    required: "La description est obligatoire"
                                }
                            )}
                        />
                    </Grid>
                    <Grid item>
                        <FormControlLabel
                            control={(
                                <Checkbox
                                    id='allMusicsOnServer'
                                    name='allMusicsOnServer'
                                    color="primary"
                                    inputRef={register()}
                                />
                            )}
                            label='Prendre toutes les musiques du serveur'
                        />
                    </Grid>
                    <Grid item className={classes.buttonContainer}>
                        <ButtonRouter
                            to={ROUTE_ADMIN_CATEGORIES}
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
                            Créer
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}

export default AdminCreateCategory;