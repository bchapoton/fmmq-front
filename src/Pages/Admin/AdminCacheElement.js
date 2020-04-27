import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from "prop-types";
import history from "../../layout/utils/history";
import {generateRoute, ROUTE_ADMIN_CACHE_DISPLAY_ROOM} from "../../router/routes";

const useStyles = makeStyles((theme) => ({
    root: {},
    button: {
        marginLeft: 'auto'
    }
}));

export default function AdminCacheElement(props) {
    const classes = useStyles();
    const {cacheElement} = props;

    return (
        <Card className={classes.root}>
            <CardHeader
                title={cacheElement.categoryLabel}
                subheader={cacheElement.categoryId}
            />
            <CardContent>
                <div>{cacheElement.players + ' joueurs'}</div>
                <div>Musiques en cours : {cacheElement.currentMusicIndex + '/' + cacheElement.musicSchemeLength}</div>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton
                    className={classes.button}
                    onClick={() => {
                        history.push(generateRoute(ROUTE_ADMIN_CACHE_DISPLAY_ROOM, {name: ':roomId', value: cacheElement.categoryId}))
                    }}
                >
                    <ExpandMoreIcon/>
                </IconButton>
            </CardActions>
        </Card>
    );
}


AdminCacheElement.propTypes = {
    cacheElement: PropTypes.object.isRequired
};

AdminCacheElement.defaultProps = {};