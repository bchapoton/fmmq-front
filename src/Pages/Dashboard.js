import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Rooms from "../components/Rooms";
import {listGames} from "../services/GameService";
import GameSummaryCard from "./GameSummaryCard";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import SortIcon from "@material-ui/icons/Sort";
import history from "../layout/utils/history";
import {generateRoute, ROUTE_ALL_GAME} from "../router/routes";
import IconButton from "@material-ui/core/IconButton";
import Rules from "../components/Rules";

const useStyles = makeStyles({
    root: {
        padding: '2rem'
    }
});

function Dashboard() {
    const classes = useStyles();
    const [lastGames, setLastGames] = useState([]);

    useEffect(() => {
        listGames(0, 5)
            .then(response => {
                setLastGames(response.data);
            });
    }, []);

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={7}>
                    <Grid container spacing={1} direction="column">
                        <Grid item>
                            <Rules/>
                        </Grid>
                        <Grid item>
                            <Rooms/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={5}>
                    <Grid container spacing={1} direction="column">
                        <Grid item hidden={lastGames.length === 0}>
                            <Card>
                                <CardHeader
                                    title='Dernières parties'
                                    action={(
                                        <IconButton
                                            aria-label="Afficher le détail"
                                            onClick={() => {
                                                history.push(generateRoute(ROUTE_ALL_GAME));
                                            }}

                                        >
                                            <SortIcon/>
                                        </IconButton>
                                    )}
                                />
                            </Card>
                        </Grid>
                        {lastGames.map((game) => (
                            <Grid item key={`${game.date}-${game.category}`}>
                                <GameSummaryCard game={game}/>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default Dashboard;
