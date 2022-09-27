import React from 'react';
import { ROUTE_CONTRIBUTOR_IMPORTS_CREATE, ROUTE_CONTRIBUTOR_IMPORTS_EDIT } from '../../router/routes';
import ButtonRouter from '../../layout/ButtonRouter';
import { TYPE_BOOLEAN, TYPE_DATE, TYPE_JSON } from '../Admin/AdminValueConverter';
import {
    countImportsContributor,
    deleteImportsContributor,
    getImportsContributor,
} from '../../services/ContributorService';
import AdminTable from '../Admin/AdminTable';
import FMMQPageContainer from '../commons/FMMQPageContainer';
import EditIcon from '@mui/icons-material/Edit';

function ContributorImports() {
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
            id: 'ownerNickname',
            label: 'Créer par',
        },
        {
            id: 'creationDate',
            label: 'Date de création',
            type: TYPE_DATE,
        },
    ];

    const actions = [
        {
            id: 'edit',
            label: <EditIcon />,
            url: ROUTE_CONTRIBUTOR_IMPORTS_EDIT,
        },
    ];

    return (
        <FMMQPageContainer>
            <h1>Imports</h1>
            <ButtonRouter variant="contained" color="primary" to={ROUTE_CONTRIBUTOR_IMPORTS_CREATE}>
                créer
            </ButtonRouter>
            <AdminTable
                headers={headers}
                actions={actions}
                getValuesCallback={(pager) => getImportsContributor(pager)}
                countCallback={countImportsContributor}
                deleteCallback={deleteImportsContributor}
            />
        </FMMQPageContainer>
    );
}

export default ContributorImports;
