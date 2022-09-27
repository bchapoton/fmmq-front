import { getRestClient } from './NetworkUtils';

export const getCategories = (onSuccess, onError) => {
    return getRestClient().get('rooms/categories').then(onSuccess).catch(onError);
};

export const getRoomsMusicCounter = (categoryId) => {
    return getRestClient().get(`rooms/${categoryId}/musics/count`);
};

export const joinRoom = (categoryId, onSuccess) => {
    return getRestClient()
        .post(`rooms/${categoryId}/join`, {})
        .then(onSuccess)
        .catch((error) => console.log(error));
};
