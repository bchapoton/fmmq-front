import React, {useEffect, useState} from 'react';
import {makeStyles} from "@mui/styles";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import LocalLoader from "../layout/LocalLoader";
import {Card, ListItemAvatar, ListItemSecondaryAction, ListItemText} from "@mui/material";
import {getCategories, getRoomsMusicCounter} from "../services/DashboardService";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Avatar from "@mui/material/Avatar";
import AlbumIcon from '@mui/icons-material/Album';
import PersonIcon from '@mui/icons-material/Person';
import Chip from "@mui/material/Chip";
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import {generateRoute, ROUTE_PLAY} from "../router/routes";
import ButtonRouter from "../layout/ButtonRouter";


const useStyles = makeStyles({
    roomLabel: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'left'
    },
    roomLabelChild: {
        marginLeft: '5px'
    }
});

function Rooms() {
    const classes = useStyles();
    const [load, setLoad] = useState(true);
    const [rooms, setRooms] = useState([]);
    const [roomsCounter, setRoomsCounter] = useState([]);

    useEffect(() => {
        getCategories(
            (response) => {
                setRooms(response.data);
                const roomsCounters = [];
                for (let index in response.data) {
                    roomsCounters.push(response.data[index]._id);
                }
                setRoomsCounter(roomsCounters);
            },
            error => {
                console.log(error)
            }
        ).then(() => setLoad(false));
    }, []);

    useEffect(() => {
        if (roomsCounter && roomsCounter.length > 0) {
            const counters = [...roomsCounter];
            const currentId = counters.pop();
            getRoomsMusicCounter(currentId)
                .then(response => {
                    console.log('count : ' + response.data.count);
                })
                .catch(error => {
                    console.log("Can't count the room : "+ currentId)
                })
                .then(() => setRoomsCounter(counters));
        }
    }, [roomsCounter]);

    return (
        <Card elevation={3}>
            <CardHeader
                title='Avance et viens te battre'
                subheader='Choisis ta catégorie pour commencer à jouer'
            />
            <CardContent className={classes.categoryContainer}>
                <LocalLoader flex={true} load={load}>
                    <List>
                        {rooms.map(room => {
                            return (
                                <ListItem key={room._id}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <AlbumIcon/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={(
                                            <div className={classes.roomLabel}>
                                                <span>{room.label}</span>
                                                <PlayersInRoom current={room.current}/>
                                            </div>
                                        )}
                                        secondary={room.description}
                                    />
                                    <ListItemSecondaryAction>
                                        <ButtonRouter
                                            variant='contained'
                                            color='secondary'
                                            to={generateRoute(ROUTE_PLAY, {name: ':categoryId', value: room._id})}
                                        >
                                            {room.current.playersCount > 0 ? 'rejoindre' : 'commencer une partie'}
                                        </ButtonRouter>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            );
                        })}
                    </List>
                </LocalLoader>
            </CardContent>
        </Card>
    );
}

function PlayersInRoom(props) {
    const {current} = props;
    const classes = useStyles();

    if (current && current.playersCount === -1) {
        return null;
    }

    return (
        <React.Fragment>
            <Chip
                className={classes.roomLabelChild}
                size='small'
                variant='outlined'
                icon={<PersonIcon/>}
                label={current.playersCount}/>
            <Chip
                className={classes.roomLabelChild}
                size='small'
                variant='outlined'
                icon={<AudiotrackIcon/>}
                label={`${current.currentMusicCount}/${current.totalMusicCount}`}
            />
        </React.Fragment>
    );
}

export default Rooms;
