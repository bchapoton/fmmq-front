import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import {Card} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {PlayerIconTrophy} from "../components/LeaderBoardPlayerIcon";
import Moment from "react-moment";
import Tipeee from "../components/Tipeee";
import Rooms from "../components/Rooms";
import {listGames} from "../services/GameService";
import ButtonRouter from "../layout/ButtonRouter";
import {generateRoute, ROUTE_GAME_HISTORY} from "../router/routes";
import CardActions from "@material-ui/core/CardActions";

const useStyles = makeStyles({
    root: {
        padding: '2rem'
    },
    categoryContainer: {
        display: 'flex',
        minHeight: '100px'
    }
});

function Dashboard() {
    const classes = useStyles();
    const [lastGames, setLastGames] = useState([]);

    useEffect(() => {
        listGames(3,
            response => {
                setLastGames(response.data);
            }
        );
    }, []);

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={7}>
                    <Grid container spacing={1} direction="column">
                        <Grid item>
                            <Rooms/>
                        </Grid>
                        <Grid item>
                            <Tipeee/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={5}>
                    <h4 hidden={lastGames.length === 0}>Dernières parties</h4>
                    <Grid container spacing={1} direction="column">
                        {lastGames.map((game) => (
                            <Grid item key={`${game.date}-${game.category}`}>
                                <Card elevation={2}>
                                    <CardHeader
                                        title={game.category}
                                        subheader={(<span>le <Moment format='DD/MM/YYYY à H:mm'
                                                                     unix>{game.date}</Moment></span>)}
                                    />
                                    <CardContent>
                                        <Table className={classes.table} size='small'>
                                            <TableBody>
                                                {game.podium.map((row, index) => (
                                                    <TableRow key={`${game.date}-${game.category}-${row.nickname}`}>
                                                        <TableCell component="th" scope="row">
                                                            <PlayerIconTrophy position={index + 1}/>
                                                        </TableCell>
                                                        <TableCell align="center">{row.nickname}</TableCell>
                                                        <TableCell align="right">{row.score}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                    <CardActions>
                                        <ButtonRouter
                                            to={generateRoute(ROUTE_GAME_HISTORY, {name: ':gameId', value: game.id})}
                                            variant='contained'
                                            color='secondary'
                                            fullWidth
                                        >
                                            classement
                                        </ButtonRouter>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default Dashboard;
