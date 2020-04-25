import React from 'react'
import {makeStyles} from "@material-ui/core/styles";
import AdminTable from "./AdminTable";
import {countCategoriesAdmin, deleteCategoryByIdAdmin, getCategoriesAdmin} from "../../services/AdminService";
import AdminPageMenuWrapper from "./AdminPageMenuWrapper";
import ButtonRouter from "../../layout/ButtonRouter";
import {ROUTE_ADMIN_CREATE_CATEGORY, ROUTE_ADMIN_EDIT_CATEGORY, ROUTE_ADMIN_IMPORTS_EDIT} from "../../router/routes";

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
        },
        {
            id: 'order',
            label: 'Ordre'
        }
    ];

    const actions = [
        {
            id: 'edit',
            label: 'modifier',
            url: ROUTE_ADMIN_EDIT_CATEGORY
        }
    ];

    return (
        <AdminPageMenuWrapper>
            <h1>Catégories</h1>
            <div>
                <ButtonRouter to={ROUTE_ADMIN_CREATE_CATEGORY}>
                    Créer
                </ButtonRouter>
            </div>
            <AdminTable
                headers={headers}
                getValuesCallback={(pager) => getCategoriesAdmin(pager)}
                deleteCallback={deleteCategoryByIdAdmin}
                countCallback={countCategoriesAdmin}
                actions={actions}
            />
        </AdminPageMenuWrapper>
    )
}

export default AdminCategories;