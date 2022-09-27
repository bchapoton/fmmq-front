import React from 'react';
import { makeStyles } from '@mui/styles';
import { useForm } from 'react-hook-form';
import { hideLoader, showLoader } from '../../store/actions/loader.action';
import { useDispatch } from 'react-redux';
import { TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import JSONPretty from 'react-json-pretty';
import JSONPrettyMon from 'react-json-pretty/themes/monikai.css';
import DescriptionIcon from '@mui/icons-material/Description';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import FolderIcon from '@mui/icons-material/Folder';
import { grey, orange, yellow } from '@mui/material/colors';
import clsx from 'clsx';
import ButtonRouter from '../../layout/ButtonRouter';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const useStyle = makeStyles({
    root: {
        padding: '1rem',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginLeft: '10px',
    },
    marginTop: {
        marginTop: '14px',
    },
    folderContainer: {
        border: '1px solid black',
        backgroundColor: 'white',
    },
    yellowColor: {
        color: yellow[600],
    },
    orangeColor: {
        color: orange[500],
    },
    greyColor: {
        color: grey[500],
    },
});

function CreateImportCommons(props) {
    const { createImportFunction, previousUrlScreen } = props;
    const classes = useStyle();
    const dispatch = useDispatch();
    const { handleSubmit, register, errors, clearError, triggerValidation } = useForm({ mode: 'onBlur' });
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        if (await triggerValidation()) {
            console.log(data);
            clearError();
            dispatch(showLoader());
            createImportFunction({ metadata: JSON.parse(data.metadata) })
                .then((response) => {
                    dispatch(hideLoader());
                    navigate(previousUrlScreen);
                })
                .catch((error) => {
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
                <Grid container spacing={2} direction="column">
                    <Grid item>
                        <Grid container spacing={1}>
                            <Grid item xs={5}>
                                <span>Metadata</span>
                                <div className={classes.marginTop}>
                                    Les metadatas doivent être sous forme d'un objet JSON.
                                    <br />
                                    Un attribut <b>folder</b> qui représente le nom du dossier dans lequel tu vas me
                                    fournir tes musiques.
                                    <br />
                                    Un attribut <b>files</b> qui correspond à un tableau JSON d'ojets avec le nom du
                                    fichier correspondant à l'artiste et au titre.
                                </div>
                            </Grid>
                            <Grid item xs={3}>
                                <span>Le fichier zip à m'envoyer</span>
                                <div className={clsx(classes.folderContainer, classes.marginTop)}>
                                    <div>
                                        <DescriptionIcon className={classes.yellowColor} fontSize="small" />
                                        &nbsp;import.zip
                                    </div>
                                    <div style={{ marginLeft: '20px' }}>
                                        <FolderIcon className={classes.orangeColor} fontSize="small" />
                                        &nbsp;myFolder
                                    </div>
                                    <div style={{ marginLeft: '40px' }}>
                                        <InsertDriveFileIcon className={classes.greyColor} fontSize="small" />
                                        &nbsp;0001.mp3
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                <span>Format à respecter</span>
                                <JSONPretty
                                    data={{
                                        folder: 'myFolder',
                                        files: [
                                            {
                                                artist: 'Ravage feat. Balir',
                                                title: ' Mecs de Villeurbanne',
                                                file: '0001.mp3',
                                            },
                                        ],
                                    }}
                                    theme={JSONPrettyMon}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <TextField
                            id="metadata"
                            name="metadata"
                            type="text"
                            multiline={true}
                            rows={20}
                            label="Metadata"
                            variant="outlined"
                            error={errors && errors.metadata ? true : false}
                            helperText={errors && errors.metadata ? errors.metadata.message : ''}
                            fullWidth
                            inputRef={register({
                                required: 'Les metadata sont obligatoires, abuse pas mec il y a que ça !',
                                validate: (value) => validateMetadataFormat(value),
                            })}
                        />
                    </Grid>
                    <Grid item className={classes.buttonContainer}>
                        <ButtonRouter
                            to={previousUrlScreen}
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                        >
                            annuler
                        </ButtonRouter>
                        <Button variant="contained" color="primary" type="submit" className={classes.button}>
                            Créer
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}

function validateMetadataFormat(data) {
    if (data) {
        let json;
        try {
            json = JSON.parse(data);
        } catch (e) {
            return 'Les metadata doivent être à un format json valide';
        }
        if (!json.folder) {
            return "il manque l'attribut folder";
        }

        if (!Array.isArray(json.files)) {
            return "l'attribut files doit être présent et être un tableau";
        }

        for (let index in json.files) {
            const current = json.files[index];
            if (!(current.artist && current.title && current.file)) {
                return 'Au moins un élement de ton tableau files ne contient pas les trois champs requis';
            }
        }

        return true;
    }
}

CreateImportCommons.propTypes = {
    createImportFunction: PropTypes.func.isRequired,
    previousUrlScreen: PropTypes.string.isRequired,
};

CreateImportCommons.defaultProps = {};

export default CreateImportCommons;
