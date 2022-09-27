import React, {useEffect, useState} from 'react'
import {useDispatch} from "react-redux";
import {getUserDataFromJWT, hasJWT, isJWTExpired, refreshToken} from "../services/NetworkUtils";
import {setUserData} from "../store/actions/context.action";
import LocalLoader from "./LocalLoader";

function RestoreSessionProvider(props) {
    const {children} = props;
    const dispatch = useDispatch();
    const [waiting, setWaiting] = useState(true);

    // restore the session from local storage
    useEffect(() => {
        if (hasJWT()) {
            if (isJWTExpired()) {
                refreshToken()
                    .then(() => {
                        dispatch(setUserData(getUserDataFromJWT()));
                    })
                    .catch(e => console.log('error ' + e))
                    .then(() => {
                        setWaiting(false);
                    });
            } else {
                const userData = getUserDataFromJWT();
                dispatch(setUserData(userData));
                setWaiting(false);
            }
        } else {
            setWaiting(false);
        }
    }, [dispatch, setWaiting]);

    return (
        <div>
            {waiting ? <LocalLoader/> : children}
        </div>
    )
}

export default RestoreSessionProvider;