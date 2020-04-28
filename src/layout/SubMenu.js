import React from "react";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import history from "./utils/history";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles({
   subHeader: {
       backgroundColor: '#ffffff'
   }
});

function SubMenu(props) {
    const {values, divider, title} = props;
    const classes = useStyle();
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

export default SubMenu;