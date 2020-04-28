import React from 'react'
import AdminTable from "./AdminTable";
import {countCategoriesAdmin, deleteCategoryByIdAdmin, getCategoriesAdmin} from "../../services/AdminService";
import ButtonRouter from "../../layout/ButtonRouter";
import {ROUTE_ADMIN_CREATE_CATEGORY, ROUTE_ADMIN_EDIT_CATEGORY} from "../../router/routes";
import FMMQPageContainer from "../commons/FMMQPageContainer";
import EditIcon from '@material-ui/icons/Edit';
import {TYPE_BOOLEAN} from "./AdminValueConverter";

function AdminCategories() {
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
        },
        {
            id: 'allMusicsOnServer',
            label: 'Tout le serveur',
            type: TYPE_BOOLEAN
        }
    ];

    const actions = [
        {
            id: 'edit',
            label: (<EditIcon/>),
            url: ROUTE_ADMIN_EDIT_CATEGORY
        }
    ];

    return (
        <FMMQPageContainer>
            <h1>Catégories</h1>
            <div>
                <ButtonRouter variant='contained' color='primary' to={ROUTE_ADMIN_CREATE_CATEGORY}>
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
        </FMMQPageContainer>
    )
}

export default AdminCategories;