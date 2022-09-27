import React, {useEffect, useState} from 'react';
import {makeStyles} from "@mui/styles";
import Grid from "@mui/material/Grid";
import Rooms from "../components/Rooms";
import {listGames} from "../services/GameService";
import GameSummaryCard from "./GameSummaryCard";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import SortIcon from "@mui/icons-material/Sort";
import {generateRoute, ROUTE_ALL_GAME} from "../router/routes";
import IconButton from "@mui/material/IconButton";
import Rules from "../components/Rules";
import {useNavigate} from "react-router-dom";

const useStyles = makeStyles({
    root: {
        padding: '2rem'
    }
});

function Dashboard() {
    const classes = useStyles();
    const [lastGames, setLastGames] = useState([]);
    const navigate = useNavigate();

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
                                                navigate(generateRoute(ROUTE_ALL_GAME));
                                            }}
                                            size="large">
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
