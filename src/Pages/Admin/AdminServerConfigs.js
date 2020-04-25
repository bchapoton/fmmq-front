import React, {useEffect, useState} from 'react'
import {makeStyles} from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import {getServerConfigAdmin} from "../../services/AdminService";
import config from "../../config/NetworkConfig";
import AdminLoadingErrorDisplay from "./AdminLoadingErrorDisplay";
import AdminPageMenuWrapper from "./AdminPageMenuWrapper";

const useStyle = makeStyles({
    root: {
        padding: '1rem'
    }
});

function AdminServerConfigs() {
    const classes = useStyle();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [serverConfig, setServerConfig] = useState();

    useEffect(() => {
        getServerConfigAdmin()
            .then(response => {
                setServerConfig(response.data);
            })
            .catch(error => {
                setError(error);
            })
            .then(() => setLoading(false));
    }, []);

    if (loading || error) {
        return (<AdminLoadingErrorDisplay loading={loading} error={error}/>);
    }

    return (
        <AdminPageMenuWrapper>
            <h1>Configuration serveur</h1>
            <List>
                <ListItem>
                    <ListItemText
                        primary='Mode debug'
                        secondary={serverConfig.debug}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary='Version base de donnée'
                        secondary={serverConfig.dbVersion}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary='Version code'
                        secondary={serverConfig.codeVersion}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary='Date de création'
                        secondary={serverConfig.creation}
                    />
                </ListItem>
            </List>
            <h1>Configuration front</h1>
            <List>
                <ListItem>
                    <ListItemText
                        primary="URL d'API"
                        secondary={config.ApiUrl}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary="URL serveur de musique"
                        secondary={config.MusicServerBaseUrl}
                    />
                </ListItem>
            </List>
        </AdminPageMenuWrapper>
    )
}

export default AdminServerConfigs;