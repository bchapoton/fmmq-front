import React from 'react'
import Login from "../Pages/Login";
import CGU from "../Pages/CGU";
import SignUp from "../Pages/SignUp";
import GameRoom from "../Pages/GameRoom";
import Dashboard from "../Pages/Dashboard";
import {ROLE_ADMIN, ROLE_CONTRIBUTOR, ROLE_PLAYER} from "./roles";
import TipeeePage from "../Pages/TipeeePage";
import EndGame from "../Pages/EndGame";
import GameHistory from "../Pages/GameHistory";
import AdminUsers from "../Pages/Admin/AdminUsers";
import AdminGames from "../Pages/Admin/AdminGames";
import AdminCategories from "../Pages/Admin/AdminCategories";
import AdminMusics from "../Pages/Admin/AdminMusics";
import AdminServerConfigs from "../Pages/Admin/AdminServerConfigs";
import AdminImports from "../Pages/Admin/AdminImports";
import CreateImportCommons from "../Pages/commons/CreateImportCommons";
import EditImportCommons from "../Pages/commons/EditImportCommons";
import AdminCreateCategory from "../Pages/Admin/AdminCreateCategory";
import AdminEditCategory from "../Pages/Admin/AdminEditCategory";
import AllGame from "../Pages/AllGames";
import ContributorMusic from "../Pages/Contributor/ContributorMusic";
import ContributorImports from "../Pages/Contributor/ContributorImports";
import {createImportsAdmin, doImportAdmin, getImportByIdAdmin} from "../services/AdminService";
import {createImportsContributor, doImportContributor, getImportByIdContributor} from "../services/ContributorService";
import EditUserAdmin from "../Pages/Admin/EditUserAdmin";
import AdminCacheDisplay from "../Pages/Admin/AdminCacheDisplay";
import AdminRoomCacheDisplay from "../Pages/Admin/AdminRoomCacheDisplay";
import Home from "../Pages/Home";

export const ROUTE_HOME = '/';
export const ROUTE_DASHBOARD = '/dashboard';
export const ROUTE_LOGIN = '/login';
export const ROUTE_CGU = '/cgu';
export const ROUTE_SIGN_UP = '/sign-up';
export const ROUTE_PLAY = '/play/:categoryId';
export const ROUTE_TIPEEE = '/tipeee';
export const ROUTE_END_GAME = '/game-over/:gameId';
export const ROUTE_GAME_HISTORY = '/game/history/:gameId';
export const ROUTE_ALL_GAME = '/game/all';
// contributor
export const ROUTE_CONTRIBUTOR_MUSICS = '/contributor/musics';
export const ROUTE_CONTRIBUTOR_IMPORTS = '/contributor/imports';
export const ROUTE_CONTRIBUTOR_IMPORTS_CREATE = '/contributor/imports/create';
export const ROUTE_CONTRIBUTOR_IMPORTS_EDIT = '/contributor/imports/edit/:id';
// Administration
export const ROUTE_ADMIN_USERS = '/administration/users';
export const ROUTE_ADMIN_EDIT_USERS = '/administration/users/:id';
export const ROUTE_ADMIN_GAMES = '/administration/games';
export const ROUTE_ADMIN_CATEGORIES = '/administration/categories';
export const ROUTE_ADMIN_CREATE_CATEGORY = '/administration/categories/create';
export const ROUTE_ADMIN_EDIT_CATEGORY = '/administration/categories/edit/:id';
export const ROUTE_ADMIN_MUSICS = '/administration/musics';
export const ROUTE_ADMIN_SERVER_CONFIG = '/administration/serverConfig';
export const ROUTE_ADMIN_IMPORTS = '/administration/imports';
export const ROUTE_ADMIN_IMPORTS_CREATE = '/administration/imports/create';
export const ROUTE_ADMIN_IMPORTS_EDIT = '/administration/imports/edit/:id';
export const ROUTE_ADMIN_CACHE_DISPLAY = '/administration/cache/objects';
export const ROUTE_ADMIN_CACHE_DISPLAY_ROOM = '/administration/cache/objects/:roomId';

export const generateRoute = (path, params) => {
    let generatedPath = path;
    if (Array.isArray(params)) {
        params.forEach(param => generatedPath = replaceParameter(generatedPath, param));
    } else {
        generatedPath = replaceParameter(generatedPath, params);
    }
    return generatedPath;
};

const replaceParameter = (path, param) => {
    if (path && param && param.name && param.value) {
        return path.replace(param.name, param.value);
    }
    return path;
}


/**
 * Route description
 *
 * path : String : route path cf Route react-dom-router for syntax
 * notExact : true|false : exact path or not if not present the route will be exact
 * role : String(role value) : value from ./router/roles : anonymous if not set
 * children : any : Children to render
 */

export const routes = [
    {
        path: ROUTE_HOME,
        children: (<Home/>)
    },
    {
        path: ROUTE_DASHBOARD,
        role: ROLE_PLAYER,
        children: (<Dashboard/>)
    },
    {
        path: ROUTE_LOGIN,
        children: (<Login/>)
    },
    {
        path: ROUTE_CGU,
        children: (<CGU/>)
    },
    {
        path: ROUTE_SIGN_UP,
        children: (<SignUp/>)
    },
    {
        path: ROUTE_PLAY,
        role: ROLE_PLAYER,
        children: (<GameRoom/>)
    },
    {
        path: ROUTE_TIPEEE,
        children: (<TipeeePage/>)
    },
    {
        path: ROUTE_END_GAME,
        role: ROLE_PLAYER,
        children: (<EndGame/>)
    },
    {
        path: ROUTE_GAME_HISTORY,
        role: ROLE_PLAYER,
        children: (<GameHistory/>)
    },
    {
        path: ROUTE_ALL_GAME,
        role: ROLE_PLAYER,
        children: (<AllGame/>)
    },
    // Contributor
    {
        path: ROUTE_CONTRIBUTOR_MUSICS,
        role: ROLE_CONTRIBUTOR,
        children: (<ContributorMusic/>)
    },
    {
        path: ROUTE_CONTRIBUTOR_IMPORTS,
        role: ROLE_CONTRIBUTOR,
        children: (<ContributorImports/>)
    },
    {
        path: ROUTE_CONTRIBUTOR_IMPORTS_CREATE,
        role: ROLE_CONTRIBUTOR,
        children: (<CreateImportCommons
            createImportFunction={createImportsContributor}
            previousUrlScreen={ROUTE_CONTRIBUTOR_IMPORTS}
        />)
    },
    {
        path: ROUTE_CONTRIBUTOR_IMPORTS_EDIT,
        role: ROLE_CONTRIBUTOR,
        children: (<EditImportCommons
            doImportFunction={doImportContributor}
            getImportByIdFunction={getImportByIdContributor}
        />)
    },
    // Administration
    {
        path: ROUTE_ADMIN_USERS,
        role: ROLE_ADMIN,
        children: (<AdminUsers/>)
    }, {
        path: ROUTE_ADMIN_GAMES,
        role: ROLE_ADMIN,
        children: (<AdminGames/>)
    },
    {
        path: ROUTE_ADMIN_CATEGORIES,
        role: ROLE_ADMIN,
        children: (<AdminCategories/>)
    },
    {
        path: ROUTE_ADMIN_CREATE_CATEGORY,
        role: ROLE_ADMIN,
        children: (<AdminCreateCategory/>)
    },
    {
        path: ROUTE_ADMIN_EDIT_CATEGORY,
        role: ROLE_ADMIN,
        children: (<AdminEditCategory/>)
    },
    {
        path: ROUTE_ADMIN_MUSICS,
        role: ROLE_ADMIN,
        children: (<AdminMusics/>)
    },
    {
        path: ROUTE_ADMIN_SERVER_CONFIG,
        role: ROLE_ADMIN,
        children: (<AdminServerConfigs/>)
    },
    {
        path: ROUTE_ADMIN_IMPORTS,
        role: ROLE_ADMIN,
        children: (<AdminImports/>)
    },
    {
        path: ROUTE_ADMIN_IMPORTS_EDIT,
        role: ROLE_ADMIN,
        children: (<EditImportCommons
            doImportFunction={doImportAdmin}
            getImportByIdFunction={getImportByIdAdmin}
        />)
    },
    {
        path: ROUTE_ADMIN_IMPORTS_CREATE,
        role: ROLE_ADMIN,
        children: (<CreateImportCommons
            createImportFunction={createImportsAdmin}
            previousUrlScreen={ROUTE_ADMIN_IMPORTS}
        />)
    },
    {
        path: ROUTE_ADMIN_EDIT_USERS,
        role: ROLE_ADMIN,
        children: (<EditUserAdmin/>)
    },
    {
        path: ROUTE_ADMIN_CACHE_DISPLAY,
        role: ROLE_ADMIN,
        children: (<AdminCacheDisplay/>)
    },
    {
        path: ROUTE_ADMIN_CACHE_DISPLAY_ROOM,
        role: ROLE_ADMIN,
        children: (<AdminRoomCacheDisplay/>)
    }
];