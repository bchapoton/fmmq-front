import {getRestClient} from "./NetworkUtils";

export const getMusicsContributor = (pager) => {
    return getRestClient(true, {pager: pager})
        .get('contributor/musics');
};

export const countMusicsContributor = () => {
    return getRestClient()
        .get('contributor/count/musics');
};


export const getImportsContributor = (pager) => {
    return getRestClient(true, {pager: pager})
        .get('contributor/imports');
};

export const getImportByIdContributor = (id) => {
    return getRestClient()
        .get(`contributor/imports/${id}`);
};

export const doImportContributor = (id) => {
    return getRestClient()
        .post(`contributor/imports/${id}`);
};

export const createImportsContributor = (payload) => {
    return getRestClient()
        .post('contributor/imports', payload);
};

export const deleteImportsContributor = (id) => {
    return getRestClient()
        .delete(`contributor/imports/${id}`);
};

export const countImportsContributor = () => {
    return getRestClient()
        .get('contributor/count/imports');
};