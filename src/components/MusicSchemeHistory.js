import React from 'react';
import {makeStyles} from "@material-ui/styles";
import clsx from 'clsx'
import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import AudiotrackIcon from "@material-ui/icons/Audiotrack";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";

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
