export const LOGGED_IN = '[FFMQContext] LOGGED IN';
export const LOGGED_OUT = '[FFMQContext] LOGGED OUT';
export const SET_USER_DATA = '[FFMQContext] SET USER DATA';
export const CLEAR_USER_DATA = '[FFMQContext] CLEAR USER DATA';

export function setUserData(userData) {
    return {
        type: SET_USER_DATA,
        payload: userData,
    };
}

export function clearUserData() {
    return {
        type: CLEAR_USER_DATA,
    };
}