import React from 'react'
import {Navigate, Route, Routes} from "react-router-dom";
import NotFound from "../Pages/NotFound";
import {ROUTE_DASHBOARD, ROUTE_LOGIN, routes} from './routes';
import {rolesHierarchy} from './roles';
import {useSelector} from "react-redux";
import RestoreSessionProvider from "../layout/RestoreSessionProvider";
import {makeStyles} from "@mui/material/styles";
import {getHeaderHeight} from "../App";
import {Scrollbar} from "react-scrollbars-custom";

const useStyle = makeStyles({
    scrollContent: {
        height: `calc(100vh - ${getHeaderHeight()}px)`,
        overflow: 'auto',
    }
});

function RouterHandler() {
    const classes = useStyle();
    const renderedRoutes = routes.map(route => {
        return (
            <Route path={route.path} exact={!route.notExact} key={route.path}>
                <SecureChildrenRender route={route}>
                    <Scrollbar style={{height: `calc(100vh - ${getHeaderHeight()}px)`}}>
                        <RestoreSessionProvider>
                            {route.children}
                        </RestoreSessionProvider>
                    </Scrollbar>
                </SecureChildrenRender>
            </Route>
        );
    });

    return (
        <Routes>
            {renderedRoutes}
            <Route path='*'>
                <NotFound/>
            </Route>
        </Routes>
    )
}

function SecureChildrenRender(props) {
    const {children, route} = props;
    const context = useSelector(({context}) => context);
    const userContext = context.user;
    const currentUserRole = userContext && userContext.role ? userContext.role : null;
    if (!hasRole(route.role, currentUserRole)) {
        return (<Navigate to={context.loggedIN ? ROUTE_DASHBOARD : ROUTE_LOGIN}/>)
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