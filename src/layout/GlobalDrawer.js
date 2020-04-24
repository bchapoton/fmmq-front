import React from 'react';
import {Drawer} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {hideGlobalDrawer} from "../store/actions/global.drawer.action";
import {makeStyles} from "@material-ui/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import PersonIcon from "@material-ui/icons/Person";
import {
    ROUTE_ADMIN_CATEGORIES,
    ROUTE_ADMIN_GAMES,
    ROUTE_ADMIN_MUSICS,
    ROUTE_ADMIN_SERVER_CONFIG,
    ROUTE_ADMIN_USERS,
    ROUTE_DASHBOARD,
    ROUTE_HOME,
    ROUTE_LOGIN,
    ROUTE_SIGN_UP
} from "../router/routes";
import AssignmentIcon from "@material-ui/icons/Assignment";
import DashboardIcon from "@material-ui/icons/Dashboard";
import HomeIcon from "@material-ui/icons/Home";
import {clearUserData} from "../store/actions/context.action";
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import CategoryIcon from '@material-ui/icons/Category';
import history from './utils/history'
import PropTypes from "prop-types";
import ListSubheader from "@material-ui/core/ListSubheader";

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

    const anonymousMenu = [
        {
            label: 'Accueil',
            icon: (<HomeIcon/>),
            url: ROUTE_HOME
        },
        {
            label: 'Connexion',
            icon: (<PersonIcon/>),
            url: ROUTE_LOGIN
        },
        {
            label: 'Créer un compte',
            icon: (<AssignmentIcon/>),
            url: ROUTE_SIGN_UP
        },
    ];
    const connectedMenu = [
        {
            label: 'Accueil',
            icon: (<HomeIcon/>),
            url: ROUTE_HOME
        },
        {
            label: 'Dashboard',
            icon: (<DashboardIcon/>),
            url: ROUTE_DASHBOARD
        },
        {
            label: 'Déconnexion',
            icon: (<DirectionsRunIcon/>),
            callback: () => {
                dispatch(clearUserData())
            }
        }
    ];

    const topMenu = context.loggedIN ? connectedMenu : anonymousMenu;

    const adminMenu = [
        {
            label: 'Configuration serveur',
            icon: (<DirectionsRunIcon/>),
            url: ROUTE_ADMIN_SERVER_CONFIG
        },
        {
            label: 'Utilisateurs',
            icon: (<SupervisorAccountIcon/>),
            url: ROUTE_ADMIN_USERS
        },
        {
            label: 'Parties jouées',
            icon: (<SportsEsportsIcon/>),
            url: ROUTE_ADMIN_GAMES
        },
        {
            label: 'Catégories',
            icon: (<CategoryIcon/>),
            url: ROUTE_ADMIN_CATEGORIES
        },
        {
            label: 'Musiques',
            icon: (<AudiotrackIcon/>),
            url: ROUTE_ADMIN_MUSICS
        },
    ];

    const isAdmin = user && user.role === 'admin';
    const bottomMenu = isAdmin ? adminMenu : [];

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

function SubMenu(props) {
    const {values, divider, title} = props;
    if (values && values.length > 0) {
        return (
            <React.Fragment>
                <List subheader={title ? <ListSubheader>{title}</ListSubheader> : null}>
                    {values.map((item) => (
                        <ListItem
                            button
                            key={item.label}
                            onClick={() => {
                                if (item.url) {
                                    history.push(item.url);
                                } else if (item.callback) {
                                    item.callback();
                                }
                            }}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.label}/>
                        </ListItem>
                    ))}
                </List>
                {divider ? <Divider/> : null}
            </React.Fragment>
        )
    }
    return null;
}


SubMenu.propTypes = {
    values: PropTypes.array,
    divider: PropTypes.bool,
    title: PropTypes.string,
};

export default GlobalDrawer;