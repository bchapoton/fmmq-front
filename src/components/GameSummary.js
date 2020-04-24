import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/styles";
import {getGame} from "../services/GameService";
import {useDispatch} from "react-redux";
import {hideLoader, showLoader} from "../store/actions/loader.action";
import PropTypes from "prop-types";
import {orange} from "@material-ui/core/colors";
import Moment from "react-moment";
import Grid from "@material-ui/core/Grid";
import MusicSchemeHistory from "./MusicSchemeHistory";
import Divider from "@material-ui/core/Divider";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import {TableCell} from "@material-ui/core";
import ButtonRouter from "../layout/ButtonRouter";
import {generateRoute, ROUTE_DASHBOARD, ROUTE_PLAY} from "../router/routes";
import PodiumElement from "./PodiumElement";

const useStyles = makeStyles({
    root: {
        position: 'relative',
        padding: '1rem'
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        margin: '10px 0',
    },
    title: {
        fontFamily: 'ChunkFiveRegular',
        color: orange[500],
        fontSize: '2rem',
    }
});

function GameSummary(props) {
    const classes = useStyles();
    const {gameId, endGame} = props;
    const [game, setGame] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(showLoader());
        getGame(gameId,
            response => {
                setGame(response.data);
                dispatch(hideLoader());
            },
            error => {

            });
    }, [dispatch]);

    if (!game) {
        return null;
    }

    let pageTitle;
    if (endGame) {
        pageTitle = (
            <h1 className={classes.title}>La partie est terminée !</h1>
        );
    } else {
        pageTitle = (
            <h1 className={classes.title}>
                Partie du <Moment format='DD/MM/YYYY à H:mm'>{game.date}</Moment> dans la
                catégorie {game.categoryLabel}
            </h1>
        );
    }

    return (
        <div className={classes.root}>
            {pageTitle}
            <Divider/>
            {endGame ?
                (
                    <div className={classes.buttonContainer} hidden={!endGame}>
                        <ButtonRouter
                            to={generateRoute(ROUTE_DASHBOARD)}
                            variant='contained'
                            color='primary'
                        >
                            j'ai trop le seum j'arrête
                        </ButtonRouter>
                        <ButtonRouter
                            to={generateRoute(ROUTE_PLAY, {name: ':categoryId', value: game.categoryId})}
                            variant='contained'
                            color='primary'
                        >
                            vas y ramène-toi c'est reparti
                        </ButtonRouter>
                    </div>
                )
                :
                (
                    <div className={classes.buttonContainer} hidden={!endGame}>
                        <ButtonRouter
                            to={generateRoute(ROUTE_DASHBOARD)}
                            variant='contained'
                            color='primary'
                        >
                            retour au dashboard
                        </ButtonRouter>
                    </div>
                )}
            <Grid container spacing={1}>
                <Grid item xs={4}>
                    <h3>Musiques de la partie</h3>
                    <MusicSchemeHistory values={game.musicScheme}/>
                </Grid>
                <Grid item xs={8}>
                    <Grid container direction='column'>
                        <Grid item>
                            {game.podium.map((item, i) => {
                                return (
                                    <PodiumElement key={item.nickname} score={item.score} nickname={item.nickname} position={i + 1}/>
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
                                                    <TableCell align='right'>{item.score}pts</TableCell>
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
        </div>
    );
}

GameSummary.propTypes = {
    gameId: PropTypes.string.isRequired,
    endGame: PropTypes.bool.isRequired
};

export default GameSummary;
