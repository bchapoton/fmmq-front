import {getRestClient} from "./NetworkUtils";

export const getCategories = (onSuccess, onError) => {
    return getRestClient()
        .get('rooms/categories')
        .then(onSuccess)
        .catch(onError);
};

export const joinRoom = (categoryId, onSuccess) => {
    return getRestClient()
        .post(`rooms/${categoryId}/join`, {})
        .then(onSuccess)
        .catch((error) => console.log(error));
};