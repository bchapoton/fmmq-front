import React from 'react'
import AdminTable from "./AdminTable";
import {countUsersAdmin, getUsersAdmin} from "../../services/AdminService";
import {ROUTE_ADMIN_EDIT_USERS} from "../../router/routes";
import FMMQPageContainer from "../commons/FMMQPageContainer";
import EditIcon from "@material-ui/icons/Edit";

function AdminUsers() {
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
            label: (<EditIcon/>),
            url: ROUTE_ADMIN_EDIT_USERS
        }
    ];

    return (
        <FMMQPageContainer>
            <h1>Utilisateurs</h1>
            <AdminTable
                headers={headers}
                getValuesCallback={(pager) => getUsersAdmin(pager)}
                countCallback={countUsersAdmin}
                actions={actions}
            />
        </FMMQPageContainer>
    )
}

export default AdminUsers;