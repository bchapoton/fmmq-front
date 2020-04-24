import React, {useEffect, useState} from 'react';
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
import {Card, TableCell} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
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
import EventMessageFeedback from "../components/EventMessageFeedback";
import MusicProgress from "../components/MusicProgress";
import GameRoomNextTitleLoader from "../components/GameRoomNextTitleLoader";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CurrentMusicPodium from "../components/CurrentMusicPodium";
import history from "../layout/utils/history";
import {generateRoute, ROUTE_END_GAME} from "../router/routes";
import MusicSchemeHistory from "../components/MusicSchemeHistory";
import RoomChat from "../components/RoomChat";

const useStyles = makeStyles({
    root: {},
    container: {},
    gameContainer: {
        // backgroundImage: "url('/assets/img/IehB7.png')",
        // backgroundRepeat: 'repeat',
        backgroundColor: cyan[600],
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
    leaderBoardIconsContainer: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    roomTitleContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    roomLabel: {
        fontFamily: 'ChunkFiveRegular',
        color: cyan[50],
        fontSize: '2rem',
    },
    roomPLayersNumber: {
        color: cyan[50],
        marginLeft: '5px'
    },
    roomPLayersNumberIcon: {
        color: cyan[50],
        marginLeft: '10px'
    },
    musicElementContainer: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    feedbackContainer: {
        minHeight: '40px'
    }
});

const leaderBoardSummaryInitiaState = {
    none: 0,
    artist: 0,
    title: 0,
    both: 0
}

function GameRoom() {
    const classes = useStyles();
    const {categoryId} = useParams();
    const {register, handleSubmit, reset} = useForm();
    const [roomInfo, setRoomInfo] = useState();
    const [currentMusicIndexDisplayed, setCurrentMusicIndexDisplayed] = useState(0);
    const [socket, setSocket] = useState();
    const [playerToken, setPlayerToken] = useState();
    const [playerId, setPlayerId] = useState();

    const [feedback, setFeedback] = useState({});
    const [musicInProgress, setMusicInProgress] = useState(false);
    const [musicInProgressUrl, setMusicInProgressUrl] = useState("false");
    const [currentArtist, setCurrentArtist] = useState();
    const [currentTitle, setCurrentTitle] = useState();

    const [currentMusicPodium, setCurrentMusicPodium] = useState({});
    const [gameHistory, setGameHistory] = useState([]);
    const [leaderBoardGuessed, setLeaderBoardGuessed] = useState([]);
    const [gamePlayers, setGamePlayers] = useState([]);
    const [leaderBoard, setLeaderBoard] = useState([]);
    const [leaderBoardSummary, setLeaderBoardSummary] = useState(leaderBoardSummaryInitiaState);

    const [loadingEnterRoom, setLoadingEnterRoom] = useState(true);

    useEffect(() => {
        let socket;
        joinRoom(categoryId, (response) => {
            const roomInfoData = response.data;
            setPlayerId(roomInfoData.playerId);
            setCurrentMusicIndexDisplayed(roomInfoData.currentMusicIndex);
            setRoomInfo(roomInfoData);
            setGamePlayers(roomInfoData.leaderBoard);
            setLeaderBoardSummary(Object.assign({}, leaderBoardSummary, {none: roomInfoData.leaderBoard.length}));
            setPlayerToken(roomInfoData.playerToken);
            socket = getSocket(roomInfoData.socketNamespace);
            setSocket(socket);
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
                onFailed(playerId, setFeedback, payload);
            });

            socket.off('GUESSED').on('GUESSED', payload => {
                const gamePlayersCopy = [...gamePlayers];
                const leaderBoardGuessedCopy = [...leaderBoardGuessed];
                const leaderBoardSummaryCopy = Object.assign({}, leaderBoardSummary);
                const currentMusicPodiumCopy = Object.assign({}, currentMusicPodium);
                onGuessed(playerId,
                    gamePlayersCopy,
                    leaderBoardSummaryCopy,
                    leaderBoardGuessedCopy,
                    currentMusicPodiumCopy,
                    setFeedback,
                    setCurrentArtist,
                    setCurrentTitle,
                    payload);
                setGamePlayers(gamePlayersCopy);
                setLeaderBoardGuessed(leaderBoardGuessedCopy);
                setLeaderBoardSummary(leaderBoardSummaryCopy);
                setCurrentMusicPodium(currentMusicPodiumCopy);
            });

            socket.off('ROUND_STARTS').on('ROUND_STARTS', payload => {
                setMusicInProgressUrl(payload.fileUrl);
                setCurrentMusicIndexDisplayed(payload.currentMusicIndexDisplayed);
                setMusicInProgress(true);
                setLeaderBoardGuessed([]);
                setCurrentMusicPodium({});
            });

            socket.off('ROUND_ENDS').on('ROUND_ENDS', payload => {
                setMusicInProgress(false);
                setLeaderBoardGuessed([]);
                setCurrentMusicPodium({});
                setLeaderBoardSummary(Object.assign({}, leaderBoardSummaryInitiaState, {none: gamePlayers.length}));
                setCurrentArtist(null);
                setCurrentTitle(null);
                if (payload.music) {
                    const updatedGameHistory = [...gameHistory];
                    updatedGameHistory.push(payload.music);
                    setGameHistory(updatedGameHistory);
                }
            });

            socket.off('ALREADY_FOUND_EVERYTHING').on('ALREADY_FOUND_EVERYTHING', payload => {
                if (payload.playerId === playerId) {
                    setFeedback({
                        level: 'nice',
                        message: "Calmate t'as déjà tout trouvé !"
                    });
                }
            });

            socket.off('GAME_ENDS').on('GAME_ENDS', payload => {
                history.push(generateRoute(ROUTE_END_GAME, {name: ':gameId', value: payload.gameId}));
            });
        }
    }, [socket,
        gamePlayers,
        leaderBoardGuessed,
        leaderBoardSummary,
        currentMusicPodium,
        playerId]);

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
                                <div className={classes.roomTitleContainer}>
                                    <Typography className={classes.roomLabel}>{roomInfo.category.label}</Typography>
                                    <AccountCircleIcon className={classes.roomPLayersNumberIcon}/>
                                    <span className={classes.roomPLayersNumber}>{gamePlayers.length} joueurs</span>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <MusicProgress
                                    started={musicInProgress}
                                    musicUrl={musicInProgressUrl}
                                    animationEnded={animationEnded}
                                    text={'Extrait ' + currentMusicIndexDisplayed + '/' + roomInfo.musicsLength}
                                />
                                <div className={classes.musicElementContainer}>
                                    <MusicElement value={currentArtist} label='Artiste' icon={(<PersonIcon/>)}
                                                  color={yellow}/>
                                    <MusicElement value={currentTitle} label='Titre' icon={(<MicIcon/>)}
                                                  color={lightBlue}/>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                                    <OutlinedInput
                                        className={classes.guessField}
                                        id="guessField"
                                        name="guessField"
                                        type='text'
                                        placeholder="Trouve le titre et l'artiste"
                                        fullWidth
                                        inputRef={register()}
                                        autoComplete="new-password"
                                        endAdornment={(
                                            <Button type='submit' variant='contained' color='primary'>Ok</Button>
                                        )}
                                    />
                                </form>
                            </Grid>
                            <Grid className={classes.feedbackContainer} item xs={12}>
                                <EventMessageFeedback payload={feedback}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={2}>
                        <CurrentMusicPodium
                            displayed={musicInProgress}
                            currentMusicPodium={currentMusicPodium}
                        />
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
                            <MusicSchemeHistory values={gameHistory} reverse={true}/>
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
                    <Card>
                        <RoomChat categoryId={categoryId} playerId={playerId} playerToken={playerToken}/>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}

export default GameRoom;
