import React from 'react'
import {getAdminMenu} from "../../layout/menus/FMMQMenus";
import {makeStyles} from "@mui/material/styles";
import CommonsMenuPageWrapper from "../commons/CommonsMenuPageWrapper";

function AdminPageMenuWrapper(props) {
    const {children} = props;
    const adminMenu = getAdminMenu();
    return (
        <CommonsMenuPageWrapper
            menuArray={adminMenu}
        >
            {children}
        </CommonsMenuPageWrapper>
    )
}


AdminPageMenuWrapper.propTypes = {};

AdminPageMenuWrapper.defaultProps = {};

export default AdminPageMenuWrapper;