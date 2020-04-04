import React, {useEffect, useState} from 'react'
import {useDispatch} from "react-redux";
import {getUserDataFromJWT, hasJWT, isJWTExpired, refreshToken} from "../services/NetworkUtils";
import {CircularProgress} from "@material-ui/core";
import {setUserData} from "../store/actions/context.action";
import LocalLoader from "./LocalLoader";
import {makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles({
   root: {
       width: '100%',
       height: '100vh'
   }
});

function RestoreSessionProvider(props) {
    const {children} = props;
    const classes = useStyle();
    const dispatch = useDispatch();
    const [waiting, setWaiting] = useState(true);

    // restore the session from local storage
    useEffect(() => {
        if (hasJWT()) {
            if (isJWTExpired()) {
                refreshToken()
                    .then(() => {
                        console.log(getUserDataFromJWT())
                    })
                    .catch(e => console.log('error ' + e))
                    .then(() => setWaiting(false));
            } else {
                const userData = getUserDataFromJWT();
                dispatch(setUserData(userData));
                setWaiting(false);
            }
        } else {
            setWaiting(false);
        }
    }, []);

    return (
        <div className={classes.root}>
            {waiting ? <LocalLoader/> : children}
        </div>
    )
}

export default RestoreSessionProvider;