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
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import {clearUserData} from "../../store/actions/context.action";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import CategoryIcon from "@mui/icons-material/Category";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import ImportExportIcon from '@mui/icons-material/ImportExport';
import SortIcon from '@mui/icons-material/Sort';
import SettingsIcon from '@mui/icons-material/Settings';
import CachedIcon from '@mui/icons-material/Cached';

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

export function getConnectedMenu(dispatch, navigate) {
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
                dispatch(clearUserData());
                navigate(ROUTE_LOGIN);
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