import React from 'react'
import IconButton from "@mui/material/IconButton";
import MenuIcon from '@mui/icons-material/Menu';
import {useDispatch} from "react-redux";
import {showGlobalDrawer} from "../store/actions/global.drawer.action";

function GlobalDrawerButton() {
    const dispatch = useDispatch();
    const handleDrawerOpen = (event) => {
        event.preventDefault();
        dispatch(showGlobalDrawer());
    };

    return (
        <IconButton
            color="inherit"
            aria-label="Ouvrir le menu"
            onClick={handleDrawerOpen}
            edge="start"
            size="large">
            <MenuIcon/>
        </IconButton>
    );
}

export default GlobalDrawerButton;