import React from 'react'
import Login from "../Pages/Login";
import CGU from "../Pages/CGU";
import SignUp from "../Pages/SignUp";
import GameRoom from "../Pages/GameRoom";
import Dashboard from "../Pages/Dashboard";
import {ROLE_PLAYER} from "./roles";


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
        path: '/',
        role: ROLE_PLAYER,
        children: (<Dashboard/>)
    },
    {
        path: '/login',
        children: (<Login/>)
    },
    {
        path: '/cgu',
        children: (<CGU/>)
    },
    {
        path: '/sign-up',
        children: (<SignUp/>)
    },
    {
        path: '/play/:categoryId',
        role: ROLE_PLAYER,
        children: (<GameRoom/>)
    }
];