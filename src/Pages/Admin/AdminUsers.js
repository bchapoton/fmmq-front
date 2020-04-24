import React from 'react'
import {makeStyles} from "@material-ui/core/styles";
import AdminTable from "./AdminTable";
import {getUsersAdmin} from "../../services/AdminService";
import {ROUTE_ADMIN_EDIT_USERS} from "../../router/routes";

const useStyle = makeStyles({
    root: {
        padding: '1rem'
    }
});

function AdminUsers() {
    const classes = useStyle();

    const headers = [
        {
            isId: true,
            id: '_id',
            label: 'Id',
        },
        {
            id: 'nickname',
            label: 'Nickname'
        },
        {
            id: 'email',
            label: 'Email'
        },
        {
            id: 'role',
            label: 'Rôle'
        }
    ];

    const actions = [
        {
            id: 'edit',
            label: 'modifier',
            url: ROUTE_ADMIN_EDIT_USERS
        }
    ];

    return (
        <div className={classes.root}>
            <h1>Utilisateurs</h1>
            <AdminTable
                headers={headers}
                getValuesCallback={(pager) => getUsersAdmin(pager)}
                actions={actions}
            />
        </div>
    )
}

export default AdminUsers;