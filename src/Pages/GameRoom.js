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
import {debugEnter, debugFailed, debugGuessed, debugLeave} from "../services/EventsService";
import LeaderBoardGuessedCellContent from "../components/LeaderBoardGuessedCellContent";
import {joinRoom} from "../services/DashboardService";
import LocalLoader from "../layout/LocalLoader";


const useStyles = makeStyles({
    root: {},
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
    }
});

function GameRoom() {
    const classes = useStyles();
    const {categoryId} = useParams();
    const {register, handleSubmit, reset} = useForm();
    const [roomInfo, setRoomInfo] = useState();


    const [currentArtist, setCurrentArtist] = useState();
    const [currentTitle, setCurrentTitle] = useState();

    const [leaderBoardGuessed, setLeaderBoardGuessed] = useState([]);
    const [gamePlayers, setGamePlayers] = useState([]);
    const [leaderBoard, setLeaderBoard] = useState([]);
    const [leaderBoardSummary, setLeaderBoardSummary] = useState({
        none: 0,
        artist: 0,
        title: 0,
        both: 0
    });

    const [loadingEnterRoom, setLoadingEnterRoom] = useState(true);

    useEffect(() => {
        joinRoom(categoryId, (response) => {
            const roomInfoData = response.data;
            setRoomInfo(roomInfoData);
            setGamePlayers(roomInfoData.leaderBoard);
            setLeaderBoardSummary(Object.assign({}, leaderBoardSummary, {none: roomInfoData.leaderBoard.length}))

            setLoadingEnterRoom(false);
        });
    }, []);

    // DEBUG
    const [gameHistory, setGameHistory] = useState([
        {
            artist: 'Kmaro',
            title: 'Femme like you'
        },
        {
            artist: 'Kenza fara',
            title: 'hahahaha'
        },
        {
            artist: 'Vitaa',
            title: 'un titre de merde'
        },
        {
            artist: 'tragedy',
            title: 'hey ho'
        },
    ]);

    useEffect(() => {
        setLeaderBoard(sortPayersInRoom(gamePlayers));
    }, [gamePlayers]);

    const onSubmit = (data) => {
        if (data && data.guessField) {
            console.log(data.guessField);
            reset();
        }
    };
    // DEBUG


    if(loadingEnterRoom) {
        return (<LocalLoader/>);
    }

    return (
        <div className={classes.root}>
            <div className={classes.gameContainer}>
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                    </Grid>
                    <Grid item xs={8}>
                        <Grid container direction='column' spacing={1}>
                            <Grid item xs={12}>
                                <Typography>Extrait {roomInfo.currentMusicIndex}/{roomInfo.musicsLength}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                {roomInfo.category.label}
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
            <Grid container spacing={5}>
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
                                <LeaderBoardIcon value={leaderBoardSummary.none} icon={(<HelpIcon/>)} color={grey[400]}
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
                                                    <TableCell style={{display: 'flex', justifyContent: 'flex-end'}}>
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
            </Grid>
            Game room {categoryId} !
            <Button onClick={(e) => {
                setCurrentArtist('Britney Spears');
            }}>find artist</Button>
            <Button onClick={(e) => {
                setCurrentTitle('Oops I di it again');
            }}>find title</Button>
            <Button onClick={(e) => {
                setGameHistory([...gameHistory, {artist: 'Britney Spears', title: 'Oops I did it again'}]);
            }}>add game history</Button>

            <Button onClick={(e) => {
                console.log('Guessed : ' + JSON.stringify(leaderBoardGuessed));
                const {gamePlayersNew, leaderBoardSummaryNew, leaderBoardGuessedNew, message} = debugEnter('', gamePlayers, leaderBoardSummary, leaderBoardGuessed);
                setGamePlayers(gamePlayersNew);
                setLeaderBoardSummary(leaderBoardSummaryNew);
                console.log('New Guessed : ' + JSON.stringify(leaderBoardGuessedNew));
                setLeaderBoardGuessed(leaderBoardGuessedNew);
            }}>Enter</Button>

            <Button onClick={(e) => {
                const {gamePlayersNew, leaderBoardSummaryNew, leaderBoardGuessedNew, message} = debugLeave(3, gamePlayers, leaderBoardSummary, leaderBoardGuessed);
                setGamePlayers(gamePlayersNew);
                setLeaderBoardSummary(leaderBoardSummaryNew);
                setLeaderBoardGuessed(leaderBoardGuessedNew);
            }}>Leave</Button>

            <Button onClick={(e) => {
                const {gamePlayersNew, leaderBoardSummaryNew, leaderBoardGuessedNew, message} = debugGuessed(2, gamePlayers, leaderBoardSummary, leaderBoardGuessed);
                setGamePlayers(gamePlayersNew);
                setLeaderBoardSummary(leaderBoardSummaryNew);
                setLeaderBoardGuessed(leaderBoardGuessedNew);
            }}>GUESSED</Button>

            <Button onClick={(e) => {
                const {gamePlayersNew, leaderBoardSummaryNew, leaderBoardGuessedNew, message} = debugFailed(2, gamePlayers, leaderBoardSummary, leaderBoardGuessed);
                setGamePlayers(gamePlayersNew);
                setLeaderBoardSummary(leaderBoardSummaryNew);
                setLeaderBoardGuessed(leaderBoardGuessedNew);
            }}>FAILED</Button>
        </div>
    );
}

const dispatchEvent = (event) => {

};

export default GameRoom;
