import React, {useEffect, useState} from 'react'
import {makeStyles} from "@material-ui/core/styles";
import {useParams} from "react-router-dom";
import {doImportAdmin, getImportByIdAdmin} from "../../services/AdminService";
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

const useStyle = makeStyles({
    root: {
        padding: '1rem'
    }
});

function EditImportAdmin() {
    const classes = useStyle();
    const {id} = useParams();
    const dispatch = useDispatch();
    const [data, setData] = useState();
    const [importResult, setImportResult] = useState();

    useEffect(() => {
        dispatch(showLoader());
        loadData(id, dispatch, setData);
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
                        onClick={() => {
                            dispatch(showLoader());
                            doImportAdmin(data._id)
                                .then(response => {
                                    setImportResult(response.data);
                                    loadData(data._id, dispatch, setData);
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
                                secondary={JSON.parse(data.createdBy).nickname}
                            />
                            <ListItemText
                                primary='Déjà importé'
                                secondary={data.imported}
                            />
                            <ListItemText
                                primary='Date dernier import'
                                secondary={data.lastImported}
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


function loadData(id, dispatch, setData) {
    getImportByIdAdmin(id)
        .then((response) => {
            setData(response.data);
        })
        .catch(error => console.log(error.message))
        .then(() => {
            dispatch(hideLoader());
        });
}

export default EditImportAdmin;