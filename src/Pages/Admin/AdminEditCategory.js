import React, {useEffect, useState} from 'react'
import {makeStyles} from "@material-ui/core/styles";
import {useForm} from "react-hook-form";
import {hideLoader, showLoader} from "../../store/actions/loader.action";
import {useDispatch} from "react-redux";
import {TextField} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonRouter from "../../layout/ButtonRouter";
import {ROUTE_ADMIN_CATEGORIES} from "../../router/routes";
import {getCategoryAdmin, putCategoriesAdmin} from "../../services/AdminService";
import history from "../../layout/utils/history";
import {useParams} from "react-router-dom";


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

function AdminEditCategory() {
    const classes = useStyle();
    const {id} = useParams();
    const dispatch = useDispatch();
    const {handleSubmit, register, errors, clearError, triggerValidation, setValue} = useForm({mode: 'onBlur'});
    const [category, setCategory] = useState();

    useEffect(() => {
        dispatch(showLoader());
        getCategoryAdmin(id)
            .then(response => {
                const category = response.data;
                setCategory(category);
                setValue('label', category.label);
                setValue('description', category.description);
                setValue('order', category.order);
            })
            .catch(error => {
                console.log('error : ' + error);
            })
            .then(() => {
                dispatch(hideLoader());
            });
    }, []);

    const onSubmit = async (data) => {
        if (await triggerValidation()) {
            clearError();
            dispatch(showLoader());
            putCategoriesAdmin(id, data)
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

    if(!category) {
        return null;
    }

    return (
        <div className={classes.root}>
            <h1>Edition de la catégorie {category.label}</h1>
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
                        <TextField
                            id='order'
                            name='order'
                            type='number'
                            label='Ordre'
                            variant='outlined'
                            error={errors && errors.order ? true : false}
                            helperText={errors && errors.order ? errors.order.message : ''}
                            fullWidth
                            inputRef={register(
                                {
                                    required: "L'ordre est obligatoire"
                                }
                            )}
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
                            Enregistrer
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}

export default AdminEditCategory;