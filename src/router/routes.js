import React from 'react'
import Login from "../Pages/Login";
import CGU from "../Pages/CGU";
import SignUp from "../Pages/SignUp";
import GameRoom from "../Pages/GameRoom";
import Dashboard from "../Pages/Dashboard";
import {ROLE_ADMIN, ROLE_PLAYER} from "./roles";
import Home from "../Pages/Home";
import TipeeePage from "../Pages/TipeeePage";
import EndGame from "../Pages/EndGame";
import GameHistory from "../Pages/GameHistory";
import AdminUsers from "../Pages/Admin/AdminUsers";
import AdminGames from "../Pages/Admin/AdminGames";
import AdminCategories from "../Pages/Admin/AdminCategories";
import AdminMusics from "../Pages/Admin/AdminMusics";
import AdminServerConfigs from "../Pages/Admin/AdminServerConfigs";

export const ROUTE_HOME = '/';
export const ROUTE_DASHBOARD = '/dashboard';
export const ROUTE_LOGIN = '/login';
export const ROUTE_CGU = '/cgu';
export const ROUTE_SIGN_UP = '/sign-up';
export const ROUTE_PLAY = '/play/:categoryId';
export const ROUTE_TIPEEE = '/tipeee';
export const ROUTE_END_GAME = '/game-over/:gameId';
export const ROUTE_GAME_HISTORY = '/game/history/:gameId';
// Administration
export const ROUTE_ADMIN_USERS = '/administration/users';
export const ROUTE_ADMIN_EDIT_USERS = '/administration/users/:id';
export const ROUTE_ADMIN_GAMES = '/administration/games';
export const ROUTE_ADMIN_CATEGORIES = '/administration/categories';
export const ROUTE_ADMIN_MUSICS = '/administration/musics';
export const ROUTE_ADMIN_SERVER_CONFIG = '/administration/serverConfig';

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
    // Administration
    {
        path: ROUTE_ADMIN_USERS,
        role: ROLE_ADMIN,
        children: (<AdminUsers/>)
    },{
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
        path: ROUTE_ADMIN_MUSICS,
        role: ROLE_ADMIN,
        children: (<AdminMusics/>)
    },
    {
        path: ROUTE_ADMIN_SERVER_CONFIG,
        role: ROLE_ADMIN,
        children: (<AdminServerConfigs/>)
    }
];