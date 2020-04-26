import React, {useEffect, useState} from 'react'
import {makeStyles} from "@material-ui/core/styles";
import {useParams} from "react-router-dom";
import {getImportByIdAdmin} from "../../services/AdminService";
import {useDispatch} from "react-redux";
import {hideLoader, showLoader} from "../../store/actions/loader.action";
import Grid from "@material-ui/core/Grid";
import JSONPrettyMon from "react-json-pretty/themes/monikai.css";
import JSONPretty from "react-json-pretty";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {ListItemText} from "@material-ui/core";
import Moment from "react-moment";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import ButtonRouter from "../../layout/ButtonRouter";

const useStyle = makeStyles({
    root: {
        padding: '1rem'
    }
});

function EditImportCommons(props) {
    const {doImportFunction, getImportByIdFunction} = props;
    const classes = useStyle();
    const {id} = useParams();
    const dispatch = useDispatch();
    const [data, setData] = useState();
    const [importResult, setImportResult] = useState();

    useEffect(() => {
        dispatch(showLoader());
        loadData(id, dispatch, setData,getImportByIdFunction);
    }, []);

    if (!data) {
        return null;
    }

    return (
        <div className={classes.root}>
            <h1>Import [{data._id}]</h1>
            <Grid container direction='column' spacing={2}>
                <Grid item>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={() => {
                            dispatch(showLoader());
                            doImportFunction(data._id)
                                .then(response => {
                                    setImportResult(response.data);
                                    loadData(data._id, dispatch, setData, getImportByIdFunction);
                                })
                                .catch(error => {
                                    setImportResult(error);
                                })
                                .then(() => {
                                    dispatch(hideLoader());
                                });
                        }}
                    >
                        Lancer l'import
                    </Button>
                </Grid>
                <Grid item>
                    {importResult ?
                        (
                            <div>
                                <h4>Résultat de l'import</h4>
                                <JSONPretty data={importResult} theme={JSONPrettyMon}/>
                            </div>
                        )
                        : null}
                </Grid>
                <Grid item>
                    <List>
                        <ListItem>
                            <ListItemText
                                primary='Créé le'
                                secondary={(<Moment>{data.creationDate}</Moment>)}
                            />
                            <ListItemText
                                primary='Créé par'
                                secondary={data.ownerNickname}
                            />
                            <ListItemText
                                primary='Déjà importé'
                                secondary={data.imported}
                            />
                            <ListItemText
                                primary='Date dernier import'
                                secondary={data.lastImported ? (<Moment>{data.lastImported}</Moment>) : (<span>N/A</span>)}
                            />
                        </ListItem>
                    </List>
                </Grid>
                <Grid item>
                    <h4>metadata</h4>
                    <JSONPretty data={JSON.parse(data.metadata)} theme={JSONPrettyMon}/>
                </Grid>
            </Grid>
        </div>
    )
}


function loadData(id, dispatch, setData, getImportByIdFunction) {
    getImportByIdFunction(id)
        .then((response) => {
            setData(response.data);
        })
        .catch(error => console.log(error.message))
        .then(() => {
            dispatch(hideLoader());
        });
}

EditImportCommons.propTypes = {
    doImportFunction: PropTypes.func.isRequired,
    getImportByIdFunction: PropTypes.func.isRequired,
};

EditImportCommons.defaultProps = {};

export default EditImportCommons;