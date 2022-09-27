import { getRestClient } from './NetworkUtils';

export const login = (data, onSuccess, onError) => {
    return getRestClient(false).post('auth/login', data).then(onSuccess).catch(onError);
};

export const signUp = (data, onSuccess, onError) => {
    return getRestClient(false).post('auth/sign-up', data).then(onSuccess).catch(onError);
};
