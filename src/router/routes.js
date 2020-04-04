import React from 'react'
import Login from "../Pages/Login";
import CGU from "../Pages/CGU";
import SignUp from "../Pages/SignUp";
import GameRoom from "../Pages/GameRoom";
import Dashboard from "../Pages/Dashboard";
import {ROLE_PLAYER} from "./roles";
import Home from "../Pages/Home";

export const ROUTE_HOME = '/';
export const ROUTE_DASHBOARD = '/dashboard';
export const ROUTE_LOGIN = '/login';
export const ROUTE_CGU = '/cgu';
export const ROUTE_SIGN_UP = '/sign-up';
export const ROUTE_PLAY = '/play/:categoryId';

export const generateRoute = (path, params) => {
    let generatedPath = path;
    if(Array.isArray(params)) {
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
    }
];