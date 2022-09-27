import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import NotFound from '../Pages/NotFound';
import { ROUTE_DASHBOARD, ROUTE_LOGIN, routes } from './routes';
import { rolesHierarchy } from './roles';
import { useSelector } from 'react-redux';
import RestoreSessionProvider from '../layout/RestoreSessionProvider';
import { getHeaderHeight } from '../App';
import { Scrollbar } from 'react-scrollbars-custom';

function RouterHandler() {
    return (
        <Routes>
            {routes.map((route) => (
                <Route
                    path={route.path}
                    key={route.path}
                    element={
                        <SecureChildrenRender route={route}>
                            <Scrollbar style={{ height: `calc(100vh - ${getHeaderHeight()}px)` }}>
                                <RestoreSessionProvider>{route.children}</RestoreSessionProvider>
                            </Scrollbar>
                        </SecureChildrenRender>
                    }
                ></Route>
            ))}
            <Route path="*" element={<NotFound />}></Route>
        </Routes>
    );
}

function SecureChildrenRender(props) {
    const { children, route } = props;
    const context = useSelector(({ context }) => context);
    const userContext = context.user;
    const currentUserRole = userContext && userContext.role ? userContext.role : null;
    if (!hasRole(route.role, currentUserRole)) {
        return <Navigate to={context.loggedIN ? ROUTE_DASHBOARD : ROUTE_LOGIN} />;
    }
    return children;
}

function hasRole(routeRole, userRole) {
    if (!routeRole) {
        // no role on the route display it
        return true;
    }
    if (!userRole) {
        // route has a role but not the user, no need to go further
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
