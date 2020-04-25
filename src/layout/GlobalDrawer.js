import React from 'react';
import {Drawer} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {hideGlobalDrawer} from "../store/actions/global.drawer.action";
import {makeStyles} from "@material-ui/styles";
import SubMenu from "./SubMenu";
import {getAdminMenu, getAnonymousMenu, getConnectedMenu} from "./menus/FMMQMenus";

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
    const isAdmin = user && user.role === 'admin';
    const bottomMenu = isAdmin ? getAdminMenu() : [];

    return (
        <Drawer anchor='left' open={show} onClose={() => dispatch(hideGlobalDrawer())}>
            <div
                className={classes.menuContainer}
                role="presentation"
                onClick={() => dispatch(hideGlobalDrawer())}
                onKeyDown={() => dispatch(hideGlobalDrawer())}
            >
                <SubMenu values={topMenu} divider={isAdmin}/>
                <SubMenu values={bottomMenu} title='Administration'/>
            </div>
        </Drawer>
    );
}

export default GlobalDrawer;