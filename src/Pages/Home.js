import React from 'react'
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {ROUTE_DASHBOARD, ROUTE_LOGIN} from "../router/routes";

export default function Home() {
    const loggedIN = useSelector(({context}) => context.loggedIN);

    if (loggedIN) {
        return (<Navigate to={ROUTE_DASHBOARD}/>);
    } else {
        return (<Navigate to={ROUTE_LOGIN}/>);
    }
}