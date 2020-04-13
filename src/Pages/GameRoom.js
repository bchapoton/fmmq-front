import React, {useEffect, useMemo, useState} from 'react';
import {makeStyles} from "@material-ui/styles";
import {useParams} from 'react-router-dom'
import Grid from "@material-ui/core/Grid";
import MicIcon from '@material-ui/icons/Mic';
import PersonIcon from '@material-ui/icons/Person';
import Button from "@material-ui/core/Button";
import {useForm} from "react-hook-form";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import {cyan, grey, lightBlue, lightGreen, yellow} from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography";
import MusicElement from "../components/MusicElement";
import {Card, CircularProgress, TableCell} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import HelpIcon from '@material-ui/icons/Help';
import LeaderBoardIcon from "../components/LeaderBoardIcon";
import StarIcon from '@material-ui/icons/Star';
import {sortPayersInRoom} from '../services/GameService'
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import {onEnter, onFailed, onGuessed, sendGuessEvent} from "../services/EventsService";
import LeaderBoardGuessedCellContent from "../components/LeaderBoardGuessedCellContent";
import {joinRoom} from "../services/DashboardService";
import LocalLoader from "../layout/LocalLoader";
import {getSocket} from "../services/SocketUtils";
import {useSelector} from "react-redux";
import EventMessageFeedback from "../components/EventMessageFeedback";
import MusicProgress from "../components/MusicProgress";
import GameRoomNextTitleLoader from "../components/GameRoomNextTitleLoader";

const useStyles = makeStyles({
    root: {
    },
    container: {},
    gameContainer: {
        backgroundColor: cyan[300],
        padding: '10px',
        marginBottom: '10px'
    },
    artistTitleContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    guessField: {
        backgroundColor: 'white'
    },
    gameHistoryList: {
        display: 'flex',
        flexDirection: 'column-reverse'
    },
    leaderBoardIconsContainer: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    roomLabel: {
        color: yellow[900],
        fontSize: '3rem',
        fontWeight: 'bold'
    }
});

function GameRoom() {
    const classes = useStyles();
    const {categoryId} = useParams();
    const {register, handleSubmit, reset} = useForm();
    const [roomInfo, setRoomInfo] = useState();
    const [socket, setSocket] = useState();
    const [playerToken, setPlayerToken] = useState();
    const [playerCipher, setPlayerCipher] = useState();
    const [playerId, setPlayerId] = useState();

    const [feedback, setFeedback] = useState({});
    const [musicInProgress, setMusicInProgress] = useState(false);
    const [currentArtist, setCurrentArtist] = useState();
    const [currentTitle, setCurrentTitle] = useState();

    const [gameHistory, setGameHistory] = useState([]);
    const [leaderBoardGuessed, setLeaderBoardGuessed] = useState([]);
    const [gamePlayers, setGamePlayers] = useState([]);
    const [leaderBoard, setLeaderBoard] = useState([]);
    const [leaderBoardSummary, setLeaderBoardSummary] = useState({
        none: 0,
        artist: 0,
        title: 0,
        both: 0
    });

    const sendMessage = (payload) => {
        setFeedback(payload);
    };

    const [loadingEnterRoom, setLoadingEnterRoom] = useState(true);
    const context = useSelector(({context}) => context);

    useEffect(() => {
        let socket;
        joinRoom(categoryId, (response) => {
            const roomInfoData = response.data;
            setPlayerId(context.user._id)
            setRoomInfo(roomInfoData);
            setGamePlayers(roomInfoData.leaderBoard);
            setLeaderBoardSummary(Object.assign({}, leaderBoardSummary, {none: roomInfoData.leaderBoard.length}))
            setPlayerToken(roomInfoData.playerToken);
            socket = getSocket(roomInfoData.socketNamespace);
            setSocket(socket);
            setPlayerCipher(roomInfoData.playerCipher);
            setLoadingEnterRoom(false);
        });

        return () => {
            if (socket) {
                console.log('disconnect the socket');
                socket.disconnect();
            }
        }
    }, []);

    useEffect(() => {
        if (socket) {
            socket.off('ENTER').on('ENTER', payload => {
                const gamePlayersCopy = [...gamePlayers];
                const leaderBoardSummaryCopy = Object.assign({}, leaderBoardSummary);
                onEnter(gamePlayersCopy, leaderBoardSummaryCopy, payload);
                setGamePlayers(gamePlayersCopy);
                setLeaderBoardSummary(leaderBoardSummaryCopy);
            });

            socket.off('FAILED').on('FAILED', payload => {
                onFailed(playerId, sendMessage, payload);
            });

            socket.off('GUESSED').on('GUESSED', payload => {
                const gamePlayersNew = [...gamePlayers];
                const leaderBoardGuessedNew = [...leaderBoardGuessed];
                const leaderBoardSummaryNew = Object.assign({}, leaderBoardSummary);
                onGuessed(playerId, gamePlayersNew, leaderBoardSummaryNew, leaderBoardGuessedNew, sendMessage, payload);
                setGamePlayers(gamePlayersNew);
                setLeaderBoardGuessed(leaderBoardGuessedNew);
                setLeaderBoardSummary(leaderBoardSummaryNew);
            });
        }
    }, [socket,
        gamePlayers,
        leaderBoardGuessed,
        leaderBoardSummary,
        playerId,
        sendMessage]);

    useEffect(() => {
        setLeaderBoard(sortPayersInRoom(gamePlayers));
    }, [gamePlayers]);

    const onSubmit = (data) => {
        if (data && data.guessField) {
            sendGuessEvent(socket, playerId, playerToken, data.guessField);
            reset();
        }
    };

    const animationEnded = () => {
        setMusicInProgress(false);
    };

    if (loadingEnterRoom) {
        return (<LocalLoader/>);
    }

    return (
        <div className={classes.root}>
            <div className={classes.gameContainer}>
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <GameRoomNextTitleLoader displayed={!musicInProgress}/>
                    </Grid>
                    <Grid item xs={8}>
                        <Grid container direction='column' spacing={1}>
                            <Grid item xs={12}>
                                <Typography className={classes.roomLabel}>{roomInfo.category.label}</Typography>

                            </Grid>
                            <Grid item xs={12}>
                                <MusicProgress started={musicInProgress} animationEnded={animationEnded}/>
                                <Typography>Extrait {roomInfo.currentMusicIndex}/{roomInfo.musicsLength}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Button onClick={(e) => setMusicInProgress(!musicInProgress)}>test</Button>
                            </Grid>
                            <Grid item xs={12}>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <OutlinedInput
                                        className={classes.guessField}
                                        id="guessField"
                                        name="guessField"
                                        type='text'
                                        placeholder="Trouve le titre et l'artiste"
                                        fullWidth
                                        inputRef={register()}
                                        autoComplete='false'
                                        endAdornment={(
                                            <Button type='submit' variant='contained' color='primary'>Ok</Button>
                                        )}
                                    />
                                </form>
                            </Grid>
                            <Grid item xs={12}>
                                <EventMessageFeedback payload={feedback}/>
                            </Grid>
                            <Grid item xs={12}>
                                <MusicElement value={currentArtist} label='Artiste' icon={(<PersonIcon/>)}
                                              color={yellow}/>
                            </Grid>
                            <Grid item xs={12}>
                                <MusicElement value={currentTitle} label='Titre' icon={(<MicIcon/>)} color={lightBlue}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Card>
                        <CardHeader
                            title='Partie en cours'
                        />
                        <CardContent>
                            <List className={classes.gameHistoryList}>
                                {gameHistory.map((item, i) => {
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
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card>
                        <CardHeader
                            title='Leaderboard'
                        />
                        <CardContent>
                            <div className={classes.leaderBoardIconsContainer}>
                                <LeaderBoardIcon value={leaderBoardSummary.none} icon={(<HelpIcon/>)}
                                                 color={grey[400]}
                                                 helperText="n'ont rien trouvé"/>
                                <LeaderBoardIcon value={leaderBoardSummary.artist} icon={(<PersonIcon/>)}
                                                 color={lightGreen['A700']} helperText="ont trouvé l'artiste"/>
                                <LeaderBoardIcon value={leaderBoardSummary.title} icon={(<MicIcon/>)}
                                                 color={lightGreen['A700']} helperText="ont trouvé le titre"/>
                                <LeaderBoardIcon value={leaderBoardSummary.both} icon={(<StarIcon/>)}
                                                 color={yellow[700]} helperText="ont trouvé le titre et l'artiste"/>
                            </div>
                            <TableContainer>
                                <Table>
                                    <TableBody>
                                        {leaderBoard.map((item, i) => {
                                            return (
                                                <TableRow key={item.id}>
                                                    <TableCell>{i + 1}.</TableCell>
                                                    <TableCell>{item.nickname}</TableCell>
                                                    <TableCell
                                                        style={{display: 'flex', justifyContent: 'flex-end'}}>
                                                        <LeaderBoardGuessedCellContent
                                                            leaderBoardGuessed={leaderBoardGuessed}
                                                            playerId={item.id}
                                                        />
                                                    </TableCell>
                                                    <TableCell align='right'>{item.score}pts</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                </Grid>
            </Grid>
        </div>
    );
}

export default GameRoom;
