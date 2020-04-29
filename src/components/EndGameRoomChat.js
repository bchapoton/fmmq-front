import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import RoomChat from "./RoomChat";
import {getEndGameChatSocketNamespace} from "../services/ChatUtils";
import {joinChatEndGame} from "../services/GameService";
import {makeStyles} from "@material-ui/core/styles";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";
import {blue, grey} from "@material-ui/core/colors";


const parentHeightOpen = 350;
const parentHeightClose = 40;
const parentBorder = 1;

const useStyle = makeStyles({
    chatContainer: {
        zIndex: '1200',
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'white',
        borderRight: parentBorder + 'px solid #e0e0e0',
        borderLeft: parentBorder + 'px solid #e0e0e0',
        borderTop: parentBorder + 'px solid #e0e0e0',
        width: '400px',
        right: '20px',
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
        transition: 'height 600ms, top 600ms'
    },
    chatContainerOpen: {
        height: parentHeightOpen + 'px'
    },
    chatContainerClose: {
        height: parentHeightClose + 'px'
    },
    openTransform: {
        transform: 'rotate(0deg)'
    },
    closeTransform: {
        transform: 'rotate(-180deg)'
    },
    chatHeader: {
        height: '30px',
        display: 'flex',
        justifyContent: 'space-between',
        cursor: 'pointer',
        backgroundColor: grey[100],
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
        padding: '5px',
        borderBottom: '1px solid #e0e0e0'
    },
    chatHeaderButton: {
        transition: 'transform 400ms'
    }
});

export default function EndGameRoomChat(props) {
    const {categoryId} = props;
    const classes = useStyle();
    const [playerInfo, setPlayerInfo] = useState();
    const [chatTop, setChatTop] = useState(Math.round(window.scrollY));
    const [open, setOpen] = useState(true);

    useEffect(() => {
        joinChatEndGame(categoryId)
            .then(response => {
                setPlayerInfo(response.data);
            })
            .catch(error => {
                console.log(error);
            });

        const scrollListenerCallback = () => {
            setChatTop(Math.round(window.scrollY));
        };

        window.addEventListener('scroll', scrollListenerCallback);

        return () => {
            console.log('destroy');
            window.removeEventListener('scroll', scrollListenerCallback);
        }
    }, [categoryId]);

    if (!playerInfo) {
        return null;
    }

    return (
        <div
            className={clsx(classes.chatContainer, open ? classes.chatContainerOpen : classes.chatContainerClose)}
            // style={{top: `calc(100vh - 64px - ${open ? parentHeightOpen : parentHeightClose}px - 2px + ${chatTop}px)`}}
        >
            <RoomChat
                categoryId={categoryId}
                playerId={playerInfo.id}
                playerToken={playerInfo.playerToken}
                schemeSize={0} // No operator message no need for scheme size
                socketNamespace={getEndGameChatSocketNamespace(categoryId)}
                hideChatContent={!open}
                text={(
                    <div
                        className={classes.chatHeader}
                        onClick={() => {
                            setOpen(!open);
                        }}
                    >
                        <div>Un petit débrief ?</div>
                        <IconButton
                            size='small'
                        >
                            <ExpandMoreIcon
                                className={clsx(classes.chatHeaderButton, open ? classes.openTransform : classes.closeTransform)}
                                fontSize='small'
                            />
                        </IconButton>
                    </div>
                )}
                parentHeight={parentHeightOpen - parentBorder}
            />
        </div>
    );
}

EndGameRoomChat.propTypes = {
    categoryId: PropTypes.string.isRequired,
};

EndGameRoomChat.defaultProps = {};