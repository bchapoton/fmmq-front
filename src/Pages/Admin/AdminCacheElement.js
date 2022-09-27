import React from 'react';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PropTypes from 'prop-types';
import { generateRoute, ROUTE_ADMIN_CACHE_DISPLAY_ROOM } from '../../router/routes';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {},
    button: {
        marginLeft: 'auto',
    },
}));

export default function AdminCacheElement(props) {
    const classes = useStyles();
    const { cacheElement } = props;
    const navigate = useNavigate();

    return (
        <Card className={classes.root}>
            <CardHeader title={cacheElement.categoryLabel} subheader={cacheElement.categoryId} />
            <CardContent>
                <div>{cacheElement.players + ' joueurs'}</div>
                <div>Musiques en cours : {cacheElement.currentMusicIndex + '/' + cacheElement.musicSchemeLength}</div>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton
                    className={classes.button}
                    onClick={() => {
                        navigate(
                            generateRoute(ROUTE_ADMIN_CACHE_DISPLAY_ROOM, {
                                name: ':roomId',
                                value: cacheElement.categoryId,
                            }),
                        );
                    }}
                    size="large"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}

AdminCacheElement.propTypes = {
    cacheElement: PropTypes.object.isRequired,
};

AdminCacheElement.defaultProps = {};
