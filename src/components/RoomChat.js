import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { blue, grey, red } from '@mui/material/colors';
import clsx from 'clsx';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import SendIcon from '@mui/icons-material/Send';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import PropTypes from 'prop-types';
import { sendMessageOnChat } from '../services/EventsService';
import { getSocket } from '../services/SocketUtils';
import { Scrollbar } from 'react-scrollbars-custom';

const useStyles = makeStyles({
    root: {},
    chatContent: {
        width: '100%',
        padding: '0',
        display: 'flex',
        flexDirection: 'column-reverse',
    },
    formContainer: {
        margin: '5px',
    },
    errorMessage: {
        marginLeft: '10px',
        fontSize: '15px',
        color: red[600],
    },
    sendIcon: {
        color: blue[500],
    },
    operatorAvatar: {
        marginLeft: '10px',
    },
    operatorMessage: {
        width: 'calc(100% - 20px)',
        margin: '0 10px 10px 10px',
        padding: '0',
        borderRadius: '10px',
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: grey[300],
    },
    message: {
        width: 'calc(85% - 20px)',
        padding: '5px 10px',
        borderRadius: '20px',
        marginBottom: '5px',
    },
    listItem: {
        margin: '0',
        padding: '0',
    },
    messageWrapper: {
        width: '100%',
    },
    author: {
        marginLeft: '2%',
        fontSize: '13px',
        fontWeight: 'bold',
    },
    me: {
        marginLeft: '14%',
        color: 'white',
        backgroundColor: blue[400],
    },
    other: {
        marginLeft: '1%',
        backgroundColor: grey[200],
    },
    chatContentHidden: {
        display: 'none',
    },
});

const initialMessages = [];
const maxMessages = 50;

function RoomChat(props) {
    const classes = useStyles();
    const { schemeSize, categoryId, playerId, playerToken, socketNamespace, text, parentHeight, hideChatContent } =
        props;
    const { register, handleSubmit, reset } = useForm();
    const [messages, setMessages] = useState(initialMessages);
    const [error, setError] = useState();
    const [lastSend, setLastSend] = useState();
    const [socket, setSocket] = useState();
    const [divElement, setDivElement] = useState();
    const [messageStyle, setMessageStyle] = useState({});

    useEffect(() => {
        // if parent height is set fix the size of the message according to the parent height
        if (divElement && parentHeight > -1) {
            setMessageStyle({ height: Math.round(parentHeight - divElement.clientHeight) + 'px' });
        }
    }, [divElement, parentHeight]);

    useEffect(() => {
        let socket = getSocket(socketNamespace);
        console.log('connect to namespace ' + socketNamespace);
        setSocket(socket);

        return () => {
            if (socket) {
                socket.disconnect();
                console.log('disconnect to namespace ' + socketNamespace);
            }
        };
    }, [socketNamespace]);

    useEffect(() => {
        if (socket) {
            socket.off('MESSAGE_RECEIVED').on('MESSAGE_RECEIVED', (payload) => {
                const newMessages = [...messages];
                if (newMessages.length > maxMessages) {
                    newMessages.shift();
                }
                newMessages.push(payload);
                setMessages(newMessages);
            });
        }
    }, [socket, messages]);

    const onSubmit = (data) => {
        if (data && data.message) {
            if (data.message.length < 2) {
                setError('Y va falloir ??tre plus loquace que ??a mon pote');
            } else if (lastSend && new Date().getTime() - lastSend < 500) {
                setError('On se calme');
            } else {
                const currentTime = new Date().getTime();
                setLastSend(currentTime);
                setError(null);
                sendMessageOnChat(socket, categoryId, playerId, playerToken, currentTime, data.message);
                reset();
            }
        }
    };

    return (
        <div className={classes.root}>
            <div ref={(divElement) => setDivElement(divElement)}>
                {text ? text : null}
                <div className={clsx(classes.formContainer, hideChatContent ? classes.chatContentHidden : null)}>
                    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                        <OutlinedInput
                            className={classes.guessField}
                            id="message"
                            name="message"
                            type="text"
                            placeholder="Exprime toi pelo"
                            fullWidth
                            inputRef={register()}
                            autoComplete="new-password"
                            endAdornment={
                                <Button type="submit" variant="text" color="primary">
                                    <SendIcon className={classes.sendIcon} />
                                </Button>
                            }
                        />
                    </form>
                    <span className={classes.errorMessage}>{error}</span>
                </div>
            </div>
            <div className={clsx(hideChatContent ? classes.chatContentHidden : null)}>
                {parentHeight > -1 ? (
                    <Scrollbar style={messageStyle}>{chatContent(classes, messages, playerId, schemeSize)}</Scrollbar>
                ) : (
                    chatContent(classes, messages, playerId, schemeSize)
                )}
            </div>
        </div>
    );
}

function chatContent(classes, messages, playerId, schemeSize) {
    return (
        <List className={classes.chatContent}>
            {messages.map((message, index) => {
                const listItemKeyValue = `${message.time}-${index}`;
                if (message.playerId === 'operator') {
                    return (
                        <ListItem key={listItemKeyValue} className={classes.operatorMessage}>
                            <ListItemAvatar className={classes.operatorAvatar}>
                                <Avatar alt="Operator" src="/assets/img/operator.png" />
                            </ListItemAvatar>
                            <ListItemText
                                primary={`Extrait ${message.musicIndex}/${schemeSize} termin??, c'??tait pourtant pas si dur !`}
                                secondary={`${message.artist} - ${message.title}`}
                            />
                        </ListItem>
                    );
                }
                const isCurrentPlayer = message.playerId === playerId;
                const nickname = isCurrentPlayer ? null : (
                    <span className={classes.author}>{message.playerNickname}</span>
                );
                return (
                    <ListItem key={listItemKeyValue} className={classes.listItem}>
                        <div className={classes.messageWrapper}>
                            {nickname}
                            <div className={clsx(classes.message, isCurrentPlayer ? classes.me : classes.other)}>
                                {message.content}
                            </div>
                        </div>
                    </ListItem>
                );
            })}
        </List>
    );
}

RoomChat.propTypes = {
    socketNamespace: PropTypes.string.isRequired,
    categoryId: PropTypes.string.isRequired,
    playerId: PropTypes.string.isRequired,
    playerToken: PropTypes.string.isRequired,
    schemeSize: PropTypes.number,
    text: PropTypes.element,
    parentHeight: PropTypes.number,
    hideChatContent: PropTypes.bool,
};

RoomChat.defaultProps = {
    schemeSize: 15,
    parentHeight: -1,
    hideChatContent: false,
};

export default RoomChat;
