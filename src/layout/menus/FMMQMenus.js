import React from "react";
import {
    ROUTE_ADMIN_CACHE_DISPLAY,
    ROUTE_ADMIN_CATEGORIES,
    ROUTE_ADMIN_GAMES,
    ROUTE_ADMIN_IMPORTS,
    ROUTE_ADMIN_MUSICS,
    ROUTE_ADMIN_SERVER_CONFIG,
    ROUTE_ADMIN_USERS,
    ROUTE_ALL_GAME,
    ROUTE_CONTRIBUTOR_IMPORTS,
    ROUTE_CONTRIBUTOR_MUSICS,
    ROUTE_DASHBOARD,
    ROUTE_LOGIN,
    ROUTE_SIGN_UP
} from "../../router/routes";
import PersonIcon from "@material-ui/icons/Person";
import AssignmentIcon from "@material-ui/icons/Assignment";
import DashboardIcon from "@material-ui/icons/Dashboard";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import {clearUserData} from "../../store/actions/context.action";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import CategoryIcon from "@material-ui/icons/Category";
import AudiotrackIcon from "@material-ui/icons/Audiotrack";
import ImportExportIcon from '@material-ui/icons/ImportExport';
import SortIcon from '@material-ui/icons/Sort';
import SettingsIcon from '@material-ui/icons/Settings';
import CachedIcon from '@material-ui/icons/Cached';

export function getAnonymousMenu() {
    return [
        {
            label: 'Connexion',
            icon: (<PersonIcon/>),
            url: ROUTE_LOGIN
        },
        {
            label: 'Créer un compte',
            icon: (<AssignmentIcon/>),
            url: ROUTE_SIGN_UP
        },
    ];
}

export function getConnectedMenu(dispatch) {
    return [
        {
            label: 'Dashboard',
            icon: (<DashboardIcon/>),
            url: ROUTE_DASHBOARD
        },
        {
            label: 'Historique',
            icon: (<SortIcon/>),
            url: ROUTE_ALL_GAME
        },
        {
            label: 'Déconnexion',
            icon: (<DirectionsRunIcon/>),
            callback: () => {
                dispatch(clearUserData())
            }
        }
    ];
}

export function getAdminMenu() {
    return [
        {
            label: 'Configuration serveur',
            icon: (<SettingsIcon/>),
            url: ROUTE_ADMIN_SERVER_CONFIG
        },
        {
            label: 'Cache serveur',
            icon: (<CachedIcon/>),
            url: ROUTE_ADMIN_CACHE_DISPLAY
        },
        {
            label: 'Imports',
            icon: (<ImportExportIcon/>),
            url: ROUTE_ADMIN_IMPORTS
        },
        {
            label: 'Utilisateurs',
            icon: (<SupervisorAccountIcon/>),
            url: ROUTE_ADMIN_USERS
        },
        {
            label: 'Parties jouées',
            icon: (<SportsEsportsIcon/>),
            url: ROUTE_ADMIN_GAMES
        },
        {
            label: 'Catégories',
            icon: (<CategoryIcon/>),
            url: ROUTE_ADMIN_CATEGORIES
        },
        {
            label: 'Musiques',
            icon: (<AudiotrackIcon/>),
            url: ROUTE_ADMIN_MUSICS
        },
    ];
}

export function getContributorMenu() {
    return [
        {
            label: 'Imports',
            icon: (<ImportExportIcon/>),
            url: ROUTE_CONTRIBUTOR_IMPORTS
        },
        {
            label: 'Musiques',
            icon: (<AudiotrackIcon/>),
            url: ROUTE_CONTRIBUTOR_MUSICS
        },
    ];
}