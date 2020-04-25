import React, {useState} from 'react'
import {makeStyles} from "@material-ui/core/styles";
import AdminTable from "./AdminTable";
import {
    countMusicsAdmin,
    delDuplicateMusics, dropAllMusics,
    getDuplicateMusics,
    getMusicsAdmin,
    postReSanitizeAllDB
} from "../../services/AdminService";
import {useDispatch} from "react-redux";
import {TYPE_FMMQ_MUSIC} from "./AdminValueConverter";
import AdminPageOperations from "./AdminPageOperations";
import AdminPageMenuWrapper from "./AdminPageMenuWrapper";

const useStyle = makeStyles({
    root: {
        padding: '1rem'
    }
});

function AdminMusics() {
    const classes = useStyle();
    const dispatch = useDispatch();
    const [operationResult, setOperationResult] = useState();

    const headers = [
        {
            isId: true,
            id: '_id',
            label: 'Id',
        },
        {
            id: 'artist',
            label: 'Artiste'
        },
        {
            id: 'artistSanitized',
            label: 'Artiste nettoyé'
        },
        {
            id: 'title',
            label: 'Titre'
        },
        {
            id: 'titleSanitized',
            label: 'Titre nettoyé'
        },
        {
            id: 'file',
            label: 'Fichier',
            type: TYPE_FMMQ_MUSIC
        },
        {
            id: 'randomInt',
            label: 'randomInt'
        },
        {
            id: 'importObjectId',
            label: "Créé par l'import"
        }
    ];

    const actions = [];

    const operations = [
        {
            axiosPromise: postReSanitizeAllDB,
            label: 'Sanitize all musics'
        },
        {
            axiosPromise: getDuplicateMusics,
            label: 'Check duplicates'
        },
        {
            axiosPromise: delDuplicateMusics,
            label: 'Delete duplicates'
        },
        {
            axiosPromise: dropAllMusics,
            label: 'Drop all musics'
        }
    ];

    return (
        <AdminPageMenuWrapper>
            <h1>Musiques</h1>
            <AdminPageOperations operations={operations}/>
            <AdminTable
                headers={headers}
                getValuesCallback={(pager) => getMusicsAdmin(pager)}
                countCallback={countMusicsAdmin}
                actions={actions}
            />
        </AdminPageMenuWrapper>
    );
}

export default AdminMusics;