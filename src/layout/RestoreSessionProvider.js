import React, {useEffect, useState} from 'react'
import {useDispatch} from "react-redux";
import {getUserDataFromJWT, hasJWT, isJWTExpired, refreshToken} from "../services/NetworkUtils";
import {CircularProgress} from "@material-ui/core";
import {setUserData} from "../store/actions/context.action";

function RestoreSessionProvider(props) {
    const {children} = props;
    const dispatch = useDispatch();
    const [waiting, setWaiting] = useState(true);

    // restore the session from local storage
    useEffect(() => {
        if (hasJWT()) {
            if (isJWTExpired()) {
                refreshToken().then(() => {
                    console.log(getUserDataFromJWT())
                }).catch(e => console.log('error'))
                    .then(() => setWaiting(false));
            } else {
                const userData = getUserDataFromJWT();
                dispatch(setUserData(userData));
                setWaiting(false);
            }
        }
    }, []);

    return (
        <React.Fragment>
            {waiting ? <CircularProgress/> : children}
        </React.Fragment>
    )
}

export default RestoreSessionProvider;