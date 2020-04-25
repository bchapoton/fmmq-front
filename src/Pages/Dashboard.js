import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Tipeee from "../components/Tipeee";
import Rooms from "../components/Rooms";
import {listGames} from "../services/GameService";
import GameSummaryCard from "./GameSummaryCard";

const useStyles = makeStyles({
    root: {
        padding: '2rem'
    }
});

function Dashboard() {
    const classes = useStyles();
    const [lastGames, setLastGames] = useState([]);

    useEffect(() => {
        listGames(0, 3)
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
