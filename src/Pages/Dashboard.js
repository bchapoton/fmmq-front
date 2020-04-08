import React from 'react';
import {makeStyles} from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import {Card} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {PlayerIconTrophy} from "../components/LeaderBoardPlayerIcon";
import Moment from "react-moment";
import LocalLoader from "../layout/LocalLoader";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Tipeee from "../components/Tipeee";
import Rooms from "../components/Rooms";

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

    const lastGameValues = [
        {
            date: 1585976202,
            category: {
                label: 'Tout'
            },
            leaderBoard: [
                {user: 'benjyyyyy', score: 67},
                {user: 'ours grincheux', score: 20},
                {user: 'val', score: 5}
            ]
        },
        {
            date: 1585966202,
            category: {
                label: 'Tout'
            },
            leaderBoard: [
                {user: 'benjyyyyy', score: 67},
                {user: 'ours grincheux', score: 20},
                {user: 'val', score: 5}
            ]
        },
        {
            date: 1585965202,
            category: {
                label: 'Tout'
            },
            leaderBoard: [
                {user: 'benjyyyyy', score: 67},
                {user: 'ours grincheux', score: 20},
                {user: 'val', score: 5}
            ]
        },
    ];

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
                    <Grid container spacing={1} direction="column">
                        {lastGameValues.map((game) => (
                            <Grid item key={`${game.date}-${game.category.label}`}>
                                <Card elevation={2}>
                                    <CardHeader
                                        title={game.category.label}
                                        subheader={(<span>le <Moment format='DD/MM/YYYY à H:mm'
                                                                     unix>{game.date}</Moment></span>)}
                                    />
                                    <CardContent>
                                        <Table className={classes.table} size='small'>
                                            <TableBody>
                                                {game.leaderBoard.map((row, index) => (
                                                    <TableRow key={`${game.date}-${game.category.label}-${row.user}`}>
                                                        <TableCell component="th" scope="row">
                                                            <PlayerIconTrophy position={index + 1}/>
                                                        </TableCell>
                                                        <TableCell align="center">{row.user}</TableCell>
                                                        <TableCell align="right">{row.score}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </CardContent>
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
