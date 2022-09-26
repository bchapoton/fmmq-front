import React from 'react';
import {makeStyles} from "@mui/styles";
import clsx from 'clsx'
import PropTypes from "prop-types";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";

const useStyles = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center'
    },
    gameHistoryListReverse: {
        display: 'flex',
        flexDirection: 'column-reverse'
    },
});

function MusicSchemeHistory(props) {
    const {values, reverse} = props;
    const classes = useStyles();

    if (!values || values.length === 0) {
        return null;
    }

    return (
        <List className={clsx(reverse ? classes.gameHistoryListReverse : null)}>
            {values.map((item, i) => {
                return (
                    <ListItem key={`${i}-${item.artist}`}>
                        <ListItemAvatar>
                            <Avatar>
                                <AudiotrackIcon/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={item.artist}
                            secondary={item.title}
                        />
                    </ListItem>
                );
            })}
        </List>
    );
}

MusicSchemeHistory.propTypes = {
    values: PropTypes.array,
    reverse: PropTypes.bool,
};

MusicSchemeHistory.defaultProps = {
    values: [],
    reverse: false
};

export default MusicSchemeHistory;
