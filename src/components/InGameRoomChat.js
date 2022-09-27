import React from 'react';
import PropTypes from 'prop-types';
import RoomChat from './RoomChat';
import { getInGameChatSocketNamespace } from '../services/ChatUtils';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';

const useStyle = makeStyles({
    root: {
        padding: '5px',
    },
});

export default function InGameRoomChat(props) {
    const { schemeSize, categoryId, playerId, playerToken } = props;
    const classes = useStyle();

    return (
        <RoomChat
            categoryId={categoryId}
            playerId={playerId}
            playerToken={playerToken}
            schemeSize={schemeSize}
            socketNamespace={getInGameChatSocketNamespace(categoryId)}
            text={
                <Typography variant="subtitle1" gutterBottom className={classes.root}>
                    Chat éphémère c'est par ici
                </Typography>
            }
        />
    );
}

InGameRoomChat.propTypes = {
    categoryId: PropTypes.string.isRequired,
    playerId: PropTypes.string.isRequired,
    playerToken: PropTypes.string.isRequired,
    schemeSize: PropTypes.number,
};

InGameRoomChat.defaultProps = {
    schemeSize: 15,
};
