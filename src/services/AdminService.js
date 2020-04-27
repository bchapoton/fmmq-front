import {getRestClient} from "./NetworkUtils";

export const getUsersAdmin = (pager) => {
    return getRestClient(true, {pager: pager})
        .get('admin/users');
};

export const countUsersAdmin = () => {
    return getRestClient()
        .get('admin/count/users');
};

export const getGamesAdmin = (pager) => {
    return getRestClient(true, {pager: pager})
        .get('admin/games');
};

export const countGamesAdmin = () => {
    return getRestClient()
        .get('admin/count/games');
};

export const getCategoriesAdmin = (pager) => {
    return getRestClient(true, {pager: pager})
        .get('admin/categories');
};

export const createCategoriesAdmin = (payload) => {
    return getRestClient()
        .post('admin/categories', payload);
};

export const putCategoriesAdmin = (id, payload) => {
    return getRestClient()
        .put(`admin/categories/${id}`, payload);
};

export const getCategoryAdmin = (id) => {
    return getRestClient()
        .get(`admin/categories/${id}`);
};

export const deleteCategoryByIdAdmin = (id) => {
    return getRestClient()
        .delete(`admin/categories/${id}`);
};

export const countCategoriesAdmin = () => {
    return getRestClient()
        .get('admin/count/categories');
};

export const getMusicsAdmin = (pager) => {
    return getRestClient(true, {pager: pager})
        .get('admin/musics');
};

export const countMusicsAdmin = () => {
    return getRestClient()
        .get('admin/count/musics');
};

export const getImportsAdmin = (pager) => {
    return getRestClient(true, {pager: pager})
        .get('admin/imports');
};

export const getImportByIdAdmin = (id) => {
    return getRestClient()
        .get(`admin/imports/${id}`);
};

export const doImportAdmin = (id) => {
    return getRestClient()
        .post(`admin/imports/${id}`);
};

export const createImportsAdmin = (payload) => {
    return getRestClient()
        .post('admin/imports', payload);
};

export const deleteImportsAdmin = (id) => {
    return getRestClient()
        .delete(`admin/imports/${id}`);
};

export const countImportsAdmin = () => {
    return getRestClient()
        .get('admin/count/imports');
};

export const getServerConfigAdmin = () => {
    return getRestClient().get('admin/serverconfig');
};

export const getServerCacheObjectsAdmin = () => {
    return getRestClient().get('admin/cache/objects');
};

export const getServerCachedRoomAdmin = (roomId) => {
    return getRestClient().get(`admin/cache/objects/${roomId}`);
};

// operations
export const postReSanitizeAllDB = () => {
    return getRestClient().post('admin/musics/reSanitizeDB', {});
};

export const getDuplicateMusics = () => {
    return getRestClient().get('admin/musics/duplicates');
};

export const delDuplicateMusics = () => {
    return getRestClient().delete('admin/musics/duplicates');
};

export const dropAllMusics = () => {
    return getRestClient().delete('admin/musics/all');
};