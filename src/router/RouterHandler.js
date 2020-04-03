import React from 'react'
import {Redirect, Route, Switch} from "react-router-dom";
import NotFound from "../Pages/NotFound";
import {routes} from './routes';
import {useSelector} from "react-redux";

function RouterHandler() {
    const context = useSelector(({context}) => context.user);
    const currentUserRole = context && context.user && context.user.role ? context.user.role : null;
    const renderRoute = (route) => {
        if (route.role) {
            if (route.role !== currentUserRole) {
                return (<Redirect to='/login'/>)
            }
        }
        return route.children;
    };

    const renderedRoutes = routes.map(route => {
        return (
            <Route path={route.path} exact={!route.notExact} key={route.path}>
                <SecureChildrenRender role={route.role}>
                    {route.children}
                </SecureChildrenRender>
            </Route>
        );
    });

    return (
        <Switch>
            {renderedRoutes}
            <Route path='*'>
                <NotFound/>
            </Route>
        </Switch>
    )
}

function SecureChildrenRender(props) {
    const {children, role} = props;
    const context = useSelector(({context}) => context.user);
    const currentUserRole = context && context.user && context.user.role ? context.user.role : null;
    if (role && role !== currentUserRole) {
        return (<Redirect to='/login'/>)
    }
    return children;
}


export default RouterHandler;