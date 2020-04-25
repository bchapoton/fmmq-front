import React from 'react'
import {makeStyles} from "@material-ui/core/styles";
import AdminTable from "./AdminTable";
import {countGamesAdmin, getGamesAdmin} from "../../services/AdminService";
import {TYPE_DATE, TYPE_JSON} from "./AdminValueConverter";
import AdminPageMenuWrapper from "./AdminPageMenuWrapper";

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
            id: 'categoryLabel',
            label: 'Catégorie'
        },
        {
            id: 'podium',
            label: 'Podium',
            type: TYPE_JSON
        },
        {
            id: 'leaderBoard',
            label: 'Classement',
            type: TYPE_JSON
        },
        {
            id: 'musicScheme',
            label: 'Musiques',
            type: TYPE_JSON
        },
        {
            id: 'date',
            label: 'Date',
            type: TYPE_DATE
        }
    ];

    return (
        <AdminPageMenuWrapper>
            <h1>Parties jouées</h1>
            <AdminTable
                headers={headers}
                getValuesCallback={(pager) => getGamesAdmin(pager)}
                countCallback={countGamesAdmin}
            />
        </AdminPageMenuWrapper>
    )
}

export default AdminGames;