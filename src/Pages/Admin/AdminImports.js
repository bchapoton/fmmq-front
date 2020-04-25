import React from 'react'
import {makeStyles} from "@material-ui/core/styles";
import AdminTable from "./AdminTable";
import {countImportsAdmin, deleteImportsAdmin, getImportsAdmin} from "../../services/AdminService";
import {TYPE_BOOLEAN, TYPE_DATE, TYPE_JSON} from "./AdminValueConverter";
import AdminPageMenuWrapper from "./AdminPageMenuWrapper";
import {ROUTE_ADMIN_IMPORTS_CREATE, ROUTE_ADMIN_IMPORTS_EDIT} from "../../router/routes";
import ButtonRouter from "../../layout/ButtonRouter";

const useStyle = makeStyles({
    root: {
        padding: '1rem'
    }
});

function AdminGames() {
    const classes = useStyle();

    const headers = [
        {
            isId: true,
            id: '_id',
            label: 'Id',
        },
        {
            id: 'metadata',
            label: 'MetaData',
            type: TYPE_JSON
        },
        {
            id: 'imported',
            label: 'Importé',
            type: TYPE_BOOLEAN
        },
        {
            id: 'lastImported',
            label: 'Dernier import',
            type: TYPE_DATE
        },
        {
            id: 'createdBy',
            label: 'Créer par',
            type: TYPE_JSON
        },
        {
            id: 'creationDate',
            label: 'Date de création',
            type: TYPE_DATE
        }
    ];

    const actions = [
        {
            id: 'edit',
            label: 'modifier',
            url: ROUTE_ADMIN_IMPORTS_EDIT
        }
    ];

    return (
        <AdminPageMenuWrapper>
            <h1>Imports</h1>
            <ButtonRouter to={ROUTE_ADMIN_IMPORTS_CREATE}>
            créer
            </ButtonRouter>
            <AdminTable
                headers={headers}
                actions={actions}
                getValuesCallback={(pager) => getImportsAdmin(pager)}
                countCallback={countImportsAdmin}
                deleteCallback={deleteImportsAdmin}
            />
        </AdminPageMenuWrapper>
    )
}

export default AdminGames;