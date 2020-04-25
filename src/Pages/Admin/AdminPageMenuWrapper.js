import React from 'react'
import Grid from "@material-ui/core/Grid";
import SubMenu from "../../layout/SubMenu";
import {getAdminMenu} from "../../layout/menus/FMMQMenus";
import {makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles({
    root: {
        padding: '1rem'
    }
});

function AdminPageMenuWrapper(props) {
    const {children} = props;
    const classes = useStyle();
    const adminMenu = getAdminMenu();
    return (
        <Grid container>
            <Grid item xs={3}>
                <SubMenu values={adminMenu}/>
            </Grid>
            <Grid item xs={9}>
                {children}
            </Grid>
        </Grid>
    )
}


AdminPageMenuWrapper.propTypes = {};

AdminPageMenuWrapper.defaultProps = {};

export default AdminPageMenuWrapper;