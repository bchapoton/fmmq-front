import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { getGame } from '../services/GameService';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../store/actions/loader.action';
import PropTypes from 'prop-types';
import { orange } from '@mui/material/colors';
import Moment from 'react-moment';
import Grid from '@mui/material/Grid';
import MusicSchemeHistory from './MusicSchemeHistory';
import Divider from '@mui/material/Divider';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import { TableCell } from '@mui/material';
import ButtonRouter from '../layout/ButtonRouter';
import { generateRoute, ROUTE_DASHBOARD, ROUTE_PLAY } from '../router/routes';
import PodiumElement from './PodiumElement';
import { getSocket } from '../services/SocketUtils';
import NewGameStartsModal from './NewGameStartsModal';
import HistoryBackButton from '../layout/HistoryBackButton';
import ButtonContainer from '../layout/ButtonContainer';
import { displayChatEndGame, hideChatEndGame } from '../store/actions/chat.action';

const useStyles = makeStyles({
    root: {
        position: 'relative',
        padding: '1rem',
    },
    title: {
        fontFamily: 'ChunkFiveRegular',
        color: orange[500],
        fontSize: '2rem',
    },
});

function GameSummary(props) {
    const classes = useStyles();
    const { gameId, endGame } = props;
    const [game, setGame] = useState();
    const [nextGameModalOpen, setNextGameModalOpen] = useState(false);
    const [nextGameModalPlayerNickname, setNextGameModalPlayerNickname] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (dispatch && gameId) {
            dispatch(showLoader());
            getGame(gameId)
                .then((response) => {
                    setGame(response.data);
                    dispatch(hideLoader());
                })
                .catch((error) => {});
        }
    }, [dispatch, gameId]);

    useEffect(() => {
        // listen to the room socket, if someone restart a new game on this category, you redirected to the room, avoid to miss the first music cf Zambla gate
        let socket;
        if (game && endGame) {
            if (endGame) {
                socket = getSocket(game.categoryId);
                socket.off('NEW_GAME_STARTS').on('NEW_GAME_STARTS', (payload) => {
                    setNextGameModalPlayerNickname(payload.playerNickname);
                    setNextGameModalOpen(true);
                });

                dispatch(displayChatEndGame(game.categoryId));
            }
        }

        return () => {
            if (socket) {
                console.log('disconnect the socket');
                socket.disconnect();
                dispatch(hideChatEndGame());
            }
        };
    }, [game, endGame, dispatch]);

    if (!game) {
        return null;
    }

    let pageTitle;
    if (endGame) {
        pageTitle = <h1 className={classes.title}>La partie est termin??e !</h1>;
    } else {
        pageTitle = (
            <h1 className={classes.title}>
                Partie du <Moment format="DD/MM/YYYY ?? H[h]mm">{game.date}</Moment> dans la cat??gorie{' '}
                {game.categoryLabel}
            </h1>
        );
    }

    return (
        <div className={classes.root}>
            {pageTitle}
            <Divider />
            {endGame ? (
                <ButtonContainer justifyContent="space-around" hidden={!endGame}>
                    <ButtonRouter to={generateRoute(ROUTE_DASHBOARD)} variant="contained" color="primary">
                        je fais ma flute j'arr??te
                    </ButtonRouter>
                    <ButtonRouter
                        to={generateRoute(ROUTE_PLAY, { name: ':categoryId', value: game.categoryId })}
                        variant="contained"
                        color="primary"
                    >
                        vas y ram??ne-toi c'est reparti
                    </ButtonRouter>
                </ButtonContainer>
            ) : (
                <ButtonContainer hidden={!endGame}>
                    <HistoryBackButton>retour</HistoryBackButton>
                </ButtonContainer>
            )}
            <Grid container spacing={1}>
                <Grid item xs={4}>
                    <h3>Musiques de la partie</h3>
                    <MusicSchemeHistory values={game.musicScheme} />
                </Grid>
                <Grid item xs={8}>
                    <Grid container direction="column">
                        <Grid item>
                            {game.podium.map((item, i) => {
                                return (
                                    <PodiumElement
                                        key={item.nickname}
                                        score={item.score}
                                        nickname={item.nickname}
                                        position={i + 1}
                                    />
                                );
                            })}
                        </Grid>
                        <Grid item>
                            <h3>Classement de la partie</h3>
                            <TableContainer>
                                <Table>
                                    <TableBody>
                                        {game.leaderBoard.map((item, i) => {
                                            return (
                                                <TableRow key={item.id}>
                                                    <TableCell>{i + 1}.</TableCell>
                                                    <TableCell>{item.nickname}</TableCell>
                                                    <TableCell align="right">{item.score}pts</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <NewGameStartsModal
                open={nextGameModalOpen}
                onClose={() => {
                    setNextGameModalOpen(false);
                }}
                categoryId={game.categoryId}
                nickname={nextGameModalPlayerNickname}
            />
        </div>
    );
}

GameSummary.propTypes = {
    gameId: PropTypes.string.isRequired,
    endGame: PropTypes.bool.isRequired,
};

export default GameSummary;
