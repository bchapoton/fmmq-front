import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useNavigate, useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import MicIcon from '@mui/icons-material/Mic';
import PersonIcon from '@mui/icons-material/Person';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import OutlinedInput from '@mui/material/OutlinedInput';
import { cyan, grey, lightBlue, lightGreen, yellow } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import MusicElement from '../components/MusicElement';
import { Card, TableCell } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import HelpIcon from '@mui/icons-material/Help';
import LeaderBoardIcon from '../components/LeaderBoardIcon';
import StarIcon from '@mui/icons-material/Star';
import { sortPayersInRoom } from '../services/GameService';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import { onEnter, onFailed, onGuessed, sendGuessEvent } from '../services/EventsService';
import LeaderBoardGuessedCellContent from '../components/LeaderBoardGuessedCellContent';
import { joinRoom } from '../services/DashboardService';
import LocalLoader from '../layout/LocalLoader';
import { getSocket } from '../services/SocketUtils';
import EventMessageFeedback from '../components/EventMessageFeedback';
import MusicProgress from '../components/MusicProgress';
import GameRoomNextTitleLoader from '../components/GameRoomNextTitleLoader';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CurrentMusicPodium from '../components/CurrentMusicPodium';
import { generateRoute, ROUTE_END_GAME } from '../router/routes';
import MusicSchemeHistory from '../components/MusicSchemeHistory';
import InGameRoomChat from '../components/InGameRoomChat';

const useStyles = makeStyles({
    gameContainer: {
        backgroundColor: cyan[600],
        padding: '10px 0',
        marginBottom: '10px',
    },
    // workaround for a bug on the grid with spacing adding negative margin and calc(100%) + margin value : this make the grid overflow on the x and show a x scroll
    gridSpacingWorkaround: {
        padding: '8px',
    },
    artistTitleContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    guessField: {
        backgroundColor: 'white',
    },
    leaderBoardIconsContainer: {
        display: 'flex',
        justifyContent: 'space-around',
    },
    roomTitleContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    roomLabel: {
        fontFamily: 'ChunkFiveRegular',
        color: cyan[50],
        fontSize: '2rem',
    },
    roomPLayersNumber: {
        color: cyan[50],
        marginLeft: '5px',
    },
    roomPLayersNumberIcon: {
        color: cyan[50],
        marginLeft: '10px',
    },
    musicElementContainer: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    feedbackContainer: {
        minHeight: '40px',
    },
});

const leaderBoardSummaryInitialState = {
    none: 0,
    artist: 0,
    title: 0,
    both: 0,
};

function GameRoom() {
    const classes = useStyles();
    const { categoryId } = useParams();
    const { register, handleSubmit, reset } = useForm();
    const [roomInfo, setRoomInfo] = useState();
    const [currentMusicIndexDisplayed, setCurrentMusicIndexDisplayed] = useState(0);
    const [socket, setSocket] = useState();
    const [playerToken, setPlayerToken] = useState();
    const [playerId, setPlayerId] = useState();

    const [feedback, setFeedback] = useState({});
    const [musicInProgress, setMusicInProgress] = useState(false);
    const [musicInProgressUrl, setMusicInProgressUrl] = useState();
    const [musicStartPosition, setMusicStartPosition] = useState(0);
    const [currentArtist, setCurrentArtist] = useState();
    const [currentTitle, setCurrentTitle] = useState();

    const [currentMusicPodium, setCurrentMusicPodium] = useState({});
    const [gameHistory, setGameHistory] = useState([]);
    const [leaderBoardGuessed, setLeaderBoardGuessed] = useState([]);
    const [gamePlayers, setGamePlayers] = useState([]);
    const [leaderBoard, setLeaderBoard] = useState([]);
    const [leaderBoardSummary, setLeaderBoardSummary] = useState(leaderBoardSummaryInitialState);
    const navigate = useNavigate();

    const [loadingEnterRoom, setLoadingEnterRoom] = useState(true);

    useEffect(() => {
        let socket;
        joinRoom(categoryId, (response) => {
            const roomInfoData = response.data;
            setPlayerId(roomInfoData.playerId);
            setCurrentMusicIndexDisplayed(roomInfoData.currentMusicIndex);
            setRoomInfo(roomInfoData);
            setGamePlayers(roomInfoData.leaderBoard);
            setLeaderBoardSummary(
                Object.assign({}, leaderBoardSummaryInitialState, { none: roomInfoData.leaderBoard.length }),
            );
            setPlayerToken(roomInfoData.playerToken);
            socket = getSocket(roomInfoData.socketNamespace);
            setSocket(socket);
            setLoadingEnterRoom(false);
            startInTheMiddleOfAMusic(
                roomInfoData.currentMusicInProgress,
                setMusicInProgressUrl,
                setMusicInProgress,
                setMusicStartPosition,
            );
        });

        return () => {
            if (socket) {
                console.log('disconnect the socket');
                socket.disconnect();
            }
        };
    }, [categoryId]);

    useEffect(() => {
        if (socket) {
            socket.off('ENTER').on('ENTER', (payload) => {
                const gamePlayersCopy = [...gamePlayers];
                const leaderBoardSummaryCopy = Object.assign({}, leaderBoardSummary);
                onEnter(gamePlayersCopy, leaderBoardSummaryCopy, payload);
                setGamePlayers(gamePlayersCopy);
                setLeaderBoardSummary(leaderBoardSummaryCopy);
            });

            socket.off('FAILED').on('FAILED', (payload) => {
                onFailed(playerId, setFeedback, payload);
            });

            socket.off('GUESSED').on('GUESSED', (payload) => {
                const gamePlayersCopy = [...gamePlayers];
                const leaderBoardGuessedCopy = [...leaderBoardGuessed];
                const leaderBoardSummaryCopy = Object.assign({}, leaderBoardSummary);
                const currentMusicPodiumCopy = Object.assign({}, currentMusicPodium);
                onGuessed(
                    playerId,
                    gamePlayersCopy,
                    leaderBoardSummaryCopy,
                    leaderBoardGuessedCopy,
                    currentMusicPodiumCopy,
                    setFeedback,
                    setCurrentArtist,
                    setCurrentTitle,
                    payload,
                );
                setGamePlayers(gamePlayersCopy);
                setLeaderBoardGuessed(leaderBoardGuessedCopy);
                setLeaderBoardSummary(leaderBoardSummaryCopy);
                setCurrentMusicPodium(currentMusicPodiumCopy);
            });

            socket.off('ROUND_STARTS').on('ROUND_STARTS', (payload) => {
                setMusicStartPosition(0);
                setMusicInProgressUrl(payload.fileUrl);
                setCurrentMusicIndexDisplayed(payload.currentMusicIndexDisplayed);
                setMusicInProgress(true);
                setLeaderBoardGuessed([]);
                setCurrentMusicPodium({});
            });

            socket.off('ROUND_ENDS').on('ROUND_ENDS', (payload) => {
                setMusicInProgress(false);
                setLeaderBoardGuessed([]);
                setCurrentMusicPodium({});
                setLeaderBoardSummary(Object.assign({}, leaderBoardSummaryInitialState, { none: gamePlayers.length }));
                setCurrentArtist(null);
                setCurrentTitle(null);
                if (payload.music) {
                    const updatedGameHistory = [...gameHistory];
                    updatedGameHistory.push(payload.music);
                    setGameHistory(updatedGameHistory);
                }
            });

            socket.off('ALREADY_FOUND_EVERYTHING').on('ALREADY_FOUND_EVERYTHING', (payload) => {
                if (payload.playerId === playerId) {
                    setFeedback({
                        level: 'nice',
                        message: "Calmate t'as déjà tout trouvé !",
                    });
                }
            });

            socket.off('GAME_ENDS').on('GAME_ENDS', (payload) => {
                navigate(generateRoute(ROUTE_END_GAME, { name: ':gameId', value: payload.gameId }));
            });
        }
    }, [
        socket,
        gamePlayers,
        leaderBoardGuessed,
        leaderBoardSummary,
        currentMusicPodium,
        playerId,
        gameHistory,
        navigate,
    ]);

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
        return <LocalLoader />;
    }

    return (
        <div>
            <div className={classes.gameContainer}>
                <Grid container>
                    <Grid item xs={2}>
                        <GameRoomNextTitleLoader displayed={!musicInProgress} />
                    </Grid>
                    <Grid item xs={8}>
                        <Grid container direction="column" spacing={1}>
                            <Grid item xs={12}>
                                <div className={classes.roomTitleContainer}>
                                    <Typography className={classes.roomLabel}>{roomInfo.category.label}</Typography>
                                    <AccountCircleIcon className={classes.roomPLayersNumberIcon} />
                                    <span className={classes.roomPLayersNumber}>{gamePlayers.length} joueurs</span>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <MusicProgress
                                    startPosition={musicStartPosition}
                                    started={musicInProgress}
                                    musicUrl={musicInProgressUrl}
                                    animationEnded={animationEnded}
                                    text={'Extrait ' + currentMusicIndexDisplayed + '/' + roomInfo.musicsLength}
                                />
                                <div className={classes.musicElementContainer}>
                                    <MusicElement
                                        value={currentArtist}
                                        label="Artiste"
                                        icon={<PersonIcon />}
                                        color={yellow}
                                    />
                                    <MusicElement
                                        value={currentTitle}
                                        label="Titre"
                                        icon={<MicIcon />}
                                        color={lightBlue}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                                    <OutlinedInput
                                        className={classes.guessField}
                                        id="guessField"
                                        name="guessField"
                                        type="text"
                                        placeholder="Trouve le titre et l'artiste"
                                        fullWidth
                                        inputRef={register()}
                                        autoComplete="new-password"
                                        endAdornment={
                                            <Button type="submit" variant="contained" color="primary">
                                                Ok
                                            </Button>
                                        }
                                    />
                                </form>
                            </Grid>
                            <Grid className={classes.feedbackContainer} item xs={12}>
                                <EventMessageFeedback payload={feedback} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={2}>
                        <CurrentMusicPodium displayed={musicInProgress} currentMusicPodium={currentMusicPodium} />
                    </Grid>
                </Grid>
            </div>
            <div className={classes.gridSpacingWorkaround}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Card>
                            <CardHeader title="Partie en cours" />
                            <CardContent>
                                <MusicSchemeHistory values={gameHistory} reverse={true} />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card>
                            <CardHeader title="Leaderboard" />
                            <CardContent>
                                <div className={classes.leaderBoardIconsContainer}>
                                    <LeaderBoardIcon
                                        value={leaderBoardSummary.none}
                                        icon={<HelpIcon />}
                                        color={grey[400]}
                                        helperText="n'ont rien trouvé"
                                    />
                                    <LeaderBoardIcon
                                        value={leaderBoardSummary.artist}
                                        icon={<PersonIcon />}
                                        color={lightGreen['A700']}
                                        helperText="ont trouvé l'artiste"
                                    />
                                    <LeaderBoardIcon
                                        value={leaderBoardSummary.title}
                                        icon={<MicIcon />}
                                        color={lightGreen['A700']}
                                        helperText="ont trouvé le titre"
                                    />
                                    <LeaderBoardIcon
                                        value={leaderBoardSummary.both}
                                        icon={<StarIcon />}
                                        color={yellow[700]}
                                        helperText="ont trouvé le titre et l'artiste"
                                    />
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
                                                            style={{ display: 'flex', justifyContent: 'flex-end' }}
                                                        >
                                                            <LeaderBoardGuessedCellContent
                                                                leaderBoardGuessed={leaderBoardGuessed}
                                                                playerId={item.id}
                                                            />
                                                        </TableCell>
                                                        <TableCell align="right">{item.score}pts</TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={5}>
                        <Card>
                            <InGameRoomChat
                                categoryId={categoryId}
                                playerId={playerId}
                                playerToken={playerToken}
                                schemeSize={roomInfo.musicsLength}
                            />
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

function startInTheMiddleOfAMusic(
    currentMusicInProgress,
    setMusicInProgressUrl,
    setMusicInProgress,
    setMusicStartPosition,
) {
    if (currentMusicInProgress) {
        if (
            currentMusicInProgress.positionMilliseconds &&
            currentMusicInProgress.positionMilliseconds >= 0 &&
            currentMusicInProgress.positionMilliseconds < 28000
        ) {
            // only start the music if is left more than 2s to play
            if (currentMusicInProgress.musicInfo && currentMusicInProgress.musicInfo.fileUrl) {
                setMusicInProgressUrl(currentMusicInProgress.musicInfo.fileUrl);
                setMusicInProgress(true);
                setMusicStartPosition(currentMusicInProgress.positionMilliseconds);
            }
        }
    }
}

export default GameRoom;
