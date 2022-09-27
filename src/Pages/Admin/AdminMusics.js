import React from 'react';
import AdminTable from './AdminTable';
import {
    countMusicsAdmin,
    delDuplicateMusics,
    dropAllMusics,
    getDuplicateMusics,
    getMusicsAdmin,
    postReSanitizeAllDB,
} from '../../services/AdminService';
import { TYPE_FMMQ_MUSIC } from './AdminValueConverter';
import AdminPageOperations from './AdminPageOperations';
import FMMQPageContainer from '../commons/FMMQPageContainer';

function AdminMusics() {
    const headers = [
        {
            isId: true,
            id: '_id',
            label: 'Id',
        },
        {
            id: 'artist',
            label: 'Artiste',
        },
        {
            id: 'artistSanitized',
            label: 'Artiste nettoyé',
        },
        {
            id: 'title',
            label: 'Titre',
        },
        {
            id: 'titleSanitized',
            label: 'Titre nettoyé',
        },
        {
            id: 'file',
            label: 'Fichier',
            type: TYPE_FMMQ_MUSIC,
        },
        {
            id: 'randomInt',
            label: 'randomInt',
        },
        {
            id: 'importObjectId',
            label: "Créé par l'import",
        },
        {
            id: 'ownerNickname',
            label: 'Owner',
        },
    ];

    const actions = [];

    const operations = [
        {
            axiosPromise: postReSanitizeAllDB,
            label: 'Sanitize all musics',
        },
        {
            axiosPromise: getDuplicateMusics,
            label: 'Check duplicates',
        },
        {
            axiosPromise: delDuplicateMusics,
            label: 'Delete duplicates',
        },
        {
            axiosPromise: dropAllMusics,
            label: 'Drop all musics',
        },
    ];

    return (
        <FMMQPageContainer>
            <h1>Musiques</h1>
            <AdminPageOperations operations={operations} />
            <AdminTable
                headers={headers}
                getValuesCallback={(pager) => getMusicsAdmin(pager)}
                countCallback={countMusicsAdmin}
                actions={actions}
            />
        </FMMQPageContainer>
    );
}

export default AdminMusics;
