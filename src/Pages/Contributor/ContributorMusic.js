import React from 'react';
import { countMusicsContributor, getMusicsContributor } from '../../services/ContributorService';
import { TYPE_FMMQ_MUSIC } from '../Admin/AdminValueConverter';
import AdminTable from '../Admin/AdminTable';
import FMMQPageContainer from '../commons/FMMQPageContainer';

function ContributorMusic() {
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

    return (
        <FMMQPageContainer>
            <h1>Musiques</h1>
            <AdminTable
                headers={headers}
                getValuesCallback={(pager) => getMusicsContributor(pager)}
                countCallback={countMusicsContributor}
            />
        </FMMQPageContainer>
    );
}

export default ContributorMusic;
