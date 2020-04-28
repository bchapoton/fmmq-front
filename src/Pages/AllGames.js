import React, {useEffect, useState} from 'react'
import {makeStyles} from "@material-ui/core/styles";
import {listGames} from "../services/GameService";
import Grid from "@material-ui/core/Grid";
import GameSummaryCard from "./GameSummaryCard";
import Button from "@material-ui/core/Button";
import {useDispatch} from "react-redux";
import {hideLoader, showLoader} from "../store/actions/loader.action";

const useStyle = makeStyles({
    root: {
        padding: '1rem'
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '10px 0'
    }
});

const pagerSize = 9;

function AllGame() {
    const classes = useStyle();
    const [games, setGames] = useState([]);
    const [start, setStart] = useState(0);
    const [currentDataSize, setCurrentDataSize] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        if (Number.isInteger(start)) {
            dispatch(showLoader());
            console.log('start' + start)
            listGames(start, pagerSize)
                .then((response) => {
                    setGames(response.data);
                    setCurrentDataSize(response.data.length);
                })
                .then(() => dispatch(hideLoader()));
        }
    }, [start]);

    return (
        <div className={classes.root}>
            <h1>Historique des parties</h1>
            <div className={classes.buttonContainer}>
                <Button
                    variant='contained'
                    color='primary'
                    disabled={start === 0}
                    onClick={() => setStart(start - pagerSize)}
                >
                    prev
                </Button>
                <Button
                    variant='contained'
                    color='primary'
                    disabled={currentDataSize < pagerSize}
                    onClick={() => setStart(start => start + pagerSize)}
                >
                    next
                </Button>
            </div>
            <Grid container spacing={2}>
                {games.map(game => {
                    return (
                        <Grid item xs={6} md={4} key={'game-' + game.id}>
                            <GameSummaryCard game={game} fullHeight={true}/>
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    )
}

export default AllGame;