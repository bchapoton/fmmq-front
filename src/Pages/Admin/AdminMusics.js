import React from 'react'
import {makeStyles} from "@material-ui/core/styles";
import AdminTable from "./AdminTable";
import {getMusicsAdmin, getUsersAdmin} from "../../services/AdminService";
import {ROUTE_ADMIN_EDIT_USERS} from "../../router/routes";

const useStyle = makeStyles({
    root: {
        padding: '1rem'
    }
});

function AdminMusics() {
    const classes = useStyle();

    const headers = [
        {
            isId: true,
            id: '_id',
            label: 'Id',
        },
        {
            id: 'artist',
            label: 'Artiste'
        },
        {
            id: 'artistSanitized',
            label: 'Artiste nettoyé'
        },
        {
            id: 'title',
            label: 'Titre'
        },
        {
            id: 'titleSanitized',
            label: 'Titre nettoyé'
        },
        {
            id: 'file',
            label: 'Fichier'
        }
    ];

    const actions = [];

    return (
        <div className={classes.root}>
            <h1>Musiques</h1>
            <AdminTable
                headers={headers}
                getValuesCallback={(pager) => getMusicsAdmin(pager)}
                actions={actions}
            />
        </div>
    );
}

export default AdminMusics;