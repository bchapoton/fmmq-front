import CardHeader from "@mui/material/CardHeader";
import Moment from "react-moment";
import CardContent from "@mui/material/CardContent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {PlayerIconTrophy} from "../components/LeaderBoardPlayerIcon";
import {generateRoute, ROUTE_GAME_HISTORY} from "../router/routes";
import {Card} from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import {makeStyles} from "@mui/material/styles";
import clsx from "clsx";
import {grey} from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';
import {useNavigate} from "react-router-dom";

const useStyle = makeStyles({
    fullHeight: {
        height: '100%'
    },
    headerDate: {
        fontSize: '1rem',
        color: grey[600]
    }
});

function GameSummaryCard(props) {
    const {game, fullHeight} = props;
    const classes = useStyle();
    const navigate = useNavigate();

    return (
        <Card elevation={2} className={clsx(fullHeight ? classes.fullHeight : null)}>
            <CardHeader
                title={(<span>{game.category}&nbsp;<span className={classes.headerDate}><Moment
                    format='DD/MM/YYYY à H[h]mm'>{game.date}</Moment></span></span>)}
                action={
                    <IconButton
                        aria-label="Afficher le détail"
                        onClick={() => {
                            navigate(generateRoute(ROUTE_GAME_HISTORY, {name: ':gameId', value: game.id}))
                        }}

                    >
                        <AddIcon/>
                    </IconButton>
                }
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