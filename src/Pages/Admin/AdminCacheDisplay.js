import React, { useEffect, useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import { getServerCacheObjectsAdmin } from '../../services/AdminService';
import AdminLoadingErrorDisplay from './AdminLoadingErrorDisplay';
import FMMQPageContainer from '../commons/FMMQPageContainer';
import AdminCacheElement from './AdminCacheElement';
import Grid from '@mui/material/Grid';

function AdminCacheDisplay() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cacheData, setCacheData] = useState({});

    useEffect(() => {
        getServerCacheObjectsAdmin()
            .then((response) => {
                setCacheData(response.data);
            })
            .catch((error) => {
                setError(error);
            })
            .then(() => setLoading(false));
    }, []);

    const counters = [];
    if (cacheData && cacheData.categoryMusicsCounters) {
        Object.keys(cacheData.categoryMusicsCounters).map((key) =>
            counters.push({
                id: key,
                count: cacheData.categoryMusicsCounters[key],
            }),
        );
    }

    /*
    id: roomId,
            categoryId: room.getCategoryId(),
            categoryLabel
            players: room.countPlayers()
     */

    return (
        <FMMQPageContainer>
            <AdminLoadingErrorDisplay loading={loading} error={error}>
                <h1>Cache partie</h1>
                <Grid container spacing={2}>
                    {cacheData.rooms
                        ? cacheData.rooms.map((room) => {
                              return (
                                  <Grid item xs={4} key={room.categoryId}>
                                      <AdminCacheElement cacheElement={room} />
                                  </Grid>
                              );
                          })
                        : null}
                </Grid>
                <h1>Category musics counters</h1>
                <List>
                    {counters.map((counter) => {
                        return (
                            <ListItem key={counter.id}>
                                <ListItemText primary={counter.id} secondary={counter.count} />
                            </ListItem>
                        );
                    })}
                </List>
            </AdminLoadingErrorDisplay>
        </FMMQPageContainer>
    );
}

export default AdminCacheDisplay;
