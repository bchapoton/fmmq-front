import React from 'react'
import {Redirect, Route, Switch} from "react-router-dom";
import NotFound from "../Pages/NotFound";
import {ROUTE_HOME, routes} from './routes';
import {rolesHierarchy} from './roles';
import {useSelector} from "react-redux";
import RestoreSessionProvider from "../layout/RestoreSessionProvider";

function RouterHandler() {
    const renderedRoutes = routes.map(route => {
        return (
            <Route path={route.path} exact={!route.notExact} key={route.path}>
                <SecureChildrenRender route={route}>
                    <RestoreSessionProvider>
                        {route.children}
                    </RestoreSessionProvider>
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
    const {children, route} = props;
    const userContext = useSelector(({context}) => context.user);
    const currentUserRole = userContext && userContext.role ? userContext.role : null;
    if (!hasRole(route.role, currentUserRole)) {
        return (<Redirect to={ROUTE_HOME}/>)
    }
    return children;
}

function hasRole(routeRole, userRole) {
    if (!routeRole) { // no role on the route display it
        return true;
    }
    if (!userRole) { // route has a role but not the user, no need to go further
        return false;
    }
    let allUserRoles = [];
    allUserRoles.push(userRole);
    if (rolesHierarchy[userRole].length > 0) {
        allUserRoles = allUserRoles.concat(rolesHierarchy[userRole]);
    }
    return allUserRoles.includes(routeRole);
}

export default RouterHandler;