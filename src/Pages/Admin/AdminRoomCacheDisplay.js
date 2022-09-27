import React, { useEffect, useState } from 'react';
import { getServerCachedRoomAdmin } from '../../services/AdminService';
import { useParams } from 'react-router-dom';
import FMMQPageContainer from '../commons/FMMQPageContainer';
import JSONPrettyMon from 'react-json-pretty/themes/monikai.css';
import JSONPretty from 'react-json-pretty';

export default function AdminRoomCacheDisplay(props) {
    const { roomId } = useParams();
    const [roomCache, setRoomCache] = useState({});

    useEffect(() => {
        getServerCachedRoomAdmin(roomId)
            .then((response) => {
                setRoomCache(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <FMMQPageContainer>
            <JSONPretty data={roomCache} theme={JSONPrettyMon} />
        </FMMQPageContainer>
    );
}
