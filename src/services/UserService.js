import {getRestClient} from "./NetworkUtils";

export const getUserById = (id) => {
    return getRestClient()
        .get(`admin/users/${id}`);
};

export const putUserRole = (id, payload) => {
    return getRestClient()
        .put(`admin/users/${id}`, payload);
};