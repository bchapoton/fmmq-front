import React from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import NetworkConfig from "../config/NetworkConfig";
import {ROUTE_LOGIN} from "../router/routes";

export function getRestClient(authenticated = true) {
    let headers = {};
    if (authenticated) {
        const jwt = getJWT();
        if (!jwt) {
            clearAuthentication();
            window.location = ROUTE_LOGIN; // no JWT stored redirect to login page no need to request
            return;
        }
        headers = {
            authorization: getJWT()
        };
    }

    const instance = axios.create({
        baseURL: NetworkConfig.ApiUrl,
        timeout: 0, // no timeout
        headers: headers
    });

    if (authenticated) {
        instance.interceptors.request.use(async (request) => {
            if (isJWTExpired()) {
                const newToken = refreshToken();
                request.headers.authorization = newToken;
            }
        });

        instance.interceptors.response.use((response) => {
            console.log('intercept response');
            if (response.status === 401) {
                clearAuthentication();
                window.location = ROUTE_LOGIN;
                return;
            }
            if (response && response.headers && response.headers['x-token']) {
                storeJWT(response.headers['x-token']);
            }
        });
    }
    return instance;
}

function getJWT() {
    return localStorage.getItem('FMMQ-JWT');
}

export function storeJWT(jwt) {
    if (jwt) {
        localStorage.setItem('FMMQ-JWT', jwt);
    } else {
        localStorage.removeItem('FMMQ-JWT');
    }
}

function getRefreshToken() {
    return localStorage.getItem('FMMQ-RefreshToken');
}

export function storeRefreshToken(refreshToken) {
    localStorage.setItem('FMMQ-RefreshToken', refreshToken);
}

export function clearAuthentication() {
    localStorage.removeItem('FMMQ-JWT');
    localStorage.removeItem('FMMQ-RefreshToken');
}

export function isJWTExpired() {
    return isExpired(getJWT());
}

export function isExpired(jwt) {
    if (!jwt) {
        return true;
    }
    let decoded;
    try {
        decoded = jwtDecode(jwt);
    } catch (e) {
        return true;
    }
console.log(decoded);
    return decoded.expire > (new Date()).getTime();
}

export async function refreshToken() {
    if (!getRefreshToken()) {
        clearAuthentication();
        window.location = ROUTE_LOGIN;
        return null;
    }
    console.log('refresh token');
    // token expired refresh it
    const refreshed = await axios.create({
        baseURL: NetworkConfig.ApiUrl,
        timeout: 0
    }).post('auth/refresh', {refreshToken: getRefreshToken(), token: getJWT()});

    storeJWT(refreshed.token);
    storeRefreshToken(refreshed.refreshToken);

    return refreshed.token;
}

export function getUserDataFromJWT() {
    const jwt = getJWT();
    if(jwt) {
        const decoded = jwtDecode(jwt);
        return decoded;
    }
    return null;
}

export function hasJWT() {
    return getJWT() ? true : false;
}