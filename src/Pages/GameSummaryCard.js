import CardHeader from "@material-ui/core/CardHeader";
import Moment from "react-moment";
import CardContent from "@material-ui/core/CardContent";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {PlayerIconTrophy} from "../components/LeaderBoardPlayerIcon";
import CardActions from "@material-ui/core/CardActions";
import ButtonRouter from "../layout/ButtonRouter";
import {generateRoute, ROUTE_GAME_HISTORY} from "../router/routes";
import {Card} from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";

const useStyle = makeStyles({
    fullHeight: {
        height: '100%'
    }
});

function GameSummaryCard(props) {
    const {game, fullHeight} = props;
    const classes = useStyle();

    return (
        <Card elevation={2} className={clsx(fullHeight ? classes.fullHeight : null)}>
            <CardHeader
                title={game.category}
                subheader={(<span>le <Moment format='DD/MM/YYYY à H[h]mm'>{game.date}</Moment></span>)}
            />
            <CardContent>
                <Table size='small'>
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
    );
}


GameSummaryCard.propTypes = {
    game: PropTypes.object,
    fullHeight: PropTypes.bool,
};

GameSummaryCard.defaultProps = {
    fullHeight: false
};

export default GameSummaryCard;