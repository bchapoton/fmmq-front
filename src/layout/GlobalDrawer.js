import React from 'react';
import {Drawer} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {hideGlobalDrawer} from "../store/actions/global.drawer.action";
import {makeStyles} from "@material-ui/styles";
import SubMenu from "./SubMenu";
import {getAdminMenu, getAnonymousMenu, getConnectedMenu, getContributorMenu} from "./menus/FMMQMenus";
import {ROLE_ADMIN, ROLE_CONTRIBUTOR} from "../router/roles";

const useStyle = makeStyles({
    menuContainer: {
        width: '250px'
    }
});

function GlobalDrawer() {
    const classes = useStyle();
    const show = useSelector(({globalDrawer}) => globalDrawer.show);
    const context = useSelector(({context}) => context);
    const user = context.user;
    const dispatch = useDispatch();


    const topMenu = context.loggedIN ? getConnectedMenu(dispatch) : getAnonymousMenu();
    const isAdmin = user && user.role === ROLE_ADMIN;
    const isContributor = user && user.role === ROLE_CONTRIBUTOR;
    const adminMenu = isAdmin ? getAdminMenu() : [];
    const contributorMenu = isContributor ? getContributorMenu() : [];

    return (
        <Drawer anchor='left' open={show} onClose={() => dispatch(hideGlobalDrawer())}>
            <div
                className={classes.menuContainer}
                role="presentation"
                onClick={() => dispatch(hideGlobalDrawer())}
                onKeyDown={() => dispatch(hideGlobalDrawer())}
            >
                <SubMenu values={topMenu} divider={isAdmin}/>
                <SubMenu values={contributorMenu} title='Contributeur'/>
                <SubMenu values={adminMenu} title='Administration'/>
            </div>
        </Drawer>
    );
}

export default GlobalDrawer;