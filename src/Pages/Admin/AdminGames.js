import React from 'react';
import AdminTable from './AdminTable';
import { countGamesAdmin, getGamesAdmin } from '../../services/AdminService';
import { TYPE_DATE, TYPE_JSON } from './AdminValueConverter';
import FMMQPageContainer from '../commons/FMMQPageContainer';

function AdminGames() {
    const headers = [
        {
            isId: true,
            id: '_id',
            label: 'Id',
        },
        {
            id: 'categoryLabel',
            label: 'Catégorie',
        },
        {
            id: 'podium',
            label: 'Podium',
            type: TYPE_JSON,
        },
        {
            id: 'leaderBoard',
            label: 'Classement',
            type: TYPE_JSON,
        },
        {
            id: 'musicScheme',
            label: 'Musiques',
            type: TYPE_JSON,
        },
        {
            id: 'date',
            label: 'Date',
            type: TYPE_DATE,
        },
    ];

    return (
        <FMMQPageContainer>
            <h1>Parties jouées</h1>
            <AdminTable
                headers={headers}
                getValuesCallback={(pager) => getGamesAdmin(pager)}
                countCallback={countGamesAdmin}
            />
        </FMMQPageContainer>
    );
}

export default AdminGames;
