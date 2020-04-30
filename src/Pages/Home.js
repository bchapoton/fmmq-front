import React from 'react'
import {useSelector} from "react-redux";
import Redirect from "react-router-dom/es/Redirect";
import {ROUTE_DASHBOARD, ROUTE_LOGIN} from "../router/routes";

export default function Home() {
    const loggedIN = useSelector(({context}) => context.loggedIN);

    if (loggedIN) {
        return (<Redirect to={ROUTE_DASHBOARD}/>);
    } else {
        return (<Redirect to={ROUTE_LOGIN}/>);
    }
}