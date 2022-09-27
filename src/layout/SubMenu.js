import React from 'react';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import { useNavigate } from 'react-router-dom';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';

const useStyle = makeStyles({
    subHeader: {
        backgroundColor: '#ffffff',
    },
});

function SubMenu(props) {
    const { values, divider, title } = props;
    const classes = useStyle();
    const navigate = useNavigate();
    if (values && values.length > 0) {
        return (
            <React.Fragment>
                <List subheader={title ? <ListSubheader className={classes.subHeader}>{title}</ListSubheader> : null}>
                    {values.map((item) => (
                        <ListItem
                            button
                            key={item.label}
                            onClick={() => {
                                if (item.url) {
                                    navigate(item.url);
                                } else if (item.callback) {
                                    item.callback();
                                }
                            }}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.label} />
                        </ListItem>
                    ))}
                </List>
                {divider ? <Divider /> : null}
            </React.Fragment>
        );
    }
    return null;
}

SubMenu.propTypes = {
    values: PropTypes.array,
    divider: PropTypes.bool,
    title: PropTypes.string,
};

export default SubMenu;
