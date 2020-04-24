import React from 'react'
import {makeStyles} from "@material-ui/core/styles";
import AdminTable from "./AdminTable";
import {getCategoriesAdmin, getUsersAdmin} from "../../services/AdminService";

const useStyle = makeStyles({
    root: {
        padding: '1rem'
    }
});

function AdminCategories() {
    const classes = useStyle();

    const headers = [
        {
            isId: true,
            id: '_id',
            label: 'Id',
        },
        {
            id: 'label',
            label: 'Libellé'
        },
        {
            id: 'description',
            label: 'Description'
        }
    ];

    const actions = [];
    /*
    const actions = [
        {
            id: 'delete',
            label: 'Supprimer',
            callback: (id) => {

            }
        }
    ];
    */

    return (
        <div className={classes.root}>
            <h1>Catégories</h1>
            <AdminTable
                headers={headers}
                getValuesCallback={(pager) => getCategoriesAdmin(pager)}
                actions={actions}
            />
        </div>
    )
}

export default AdminCategories;