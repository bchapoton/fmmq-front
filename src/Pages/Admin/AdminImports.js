import React from 'react';
import AdminTable from './AdminTable';
import { countImportsAdmin, deleteImportsAdmin, getImportsAdmin } from '../../services/AdminService';
import { TYPE_BOOLEAN, TYPE_DATE, TYPE_JSON } from './AdminValueConverter';
import { ROUTE_ADMIN_IMPORTS_CREATE, ROUTE_ADMIN_IMPORTS_EDIT } from '../../router/routes';
import ButtonRouter from '../../layout/ButtonRouter';
import FMMQPageContainer from '../commons/FMMQPageContainer';
import EditIcon from '@mui/icons-material/Edit';

function AdminImports() {
    const headers = [
        {
            isId: true,
            id: '_id',
            label: 'Id',
        },
        {
            id: 'metadata',
            label: 'MetaData',
            type: TYPE_JSON,
        },
        {
            id: 'imported',
            label: 'Importé',
            type: TYPE_BOOLEAN,
        },
        {
            id: 'lastImported',
            label: 'Dernier import',
            type: TYPE_DATE,
        },
        {
            id: 'creationDate',
            label: 'Date de création',
            type: TYPE_DATE,
        },
        {
            id: 'ownerNickname',
            label: 'Owner',
        },
        {
            id: 'ownerId',
            label: 'Owner id',
        },
    ];

    const actions = [
        {
            id: 'edit',
            label: <EditIcon />,
            url: ROUTE_ADMIN_IMPORTS_EDIT,
        },
    ];

    return (
        <FMMQPageContainer>
            <h1>Imports</h1>
            <ButtonRouter variant="contained" color="primary" to={ROUTE_ADMIN_IMPORTS_CREATE}>
                créer
            </ButtonRouter>
            <AdminTable
                headers={headers}
                actions={actions}
                getValuesCallback={(pager) => getImportsAdmin(pager)}
                countCallback={countImportsAdmin}
                deleteCallback={deleteImportsAdmin}
            />
        </FMMQPageContainer>
    );
}

export default AdminImports;
