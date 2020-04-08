import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/styles";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import LocalLoader from "../layout/LocalLoader";
import {Button, Card, ListItemAvatar, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import {getCategories, joinRoom} from "../services/DashboardService";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import AlbumIcon from '@material-ui/icons/Album';
import PersonIcon from '@material-ui/icons/Person';
import Chip from "@material-ui/core/Chip";
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
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

    useEffect(() => {
        getCategories(
            (response) => {
                setRooms(response.data);
            },
            error => {
                console.log(error)
            }
        ).then(() => setLoad(false));
    }, []);

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
