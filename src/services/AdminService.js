import {getRestClient} from "./NetworkUtils";

export const getUsersAdmin = (pager) => {
    return getRestClient(true, {pager: pager})
        .get('admin/users');
};

export const getGamesAdmin = (pager) => {
    return getRestClient(true, {pager: pager})
        .get('admin/games');
};

export const getCategoriesAdmin = (pager) => {
    return getRestClient(true, {pager: pager})
        .get('admin/categories');
};

export const getMusicsAdmin = (pager) => {
    return getRestClient(true, {pager: pager})
        .get('admin/musics');
};

export const getServerConfigAdmin = () => {
    return getRestClient().get('admin/serverconfig');
};