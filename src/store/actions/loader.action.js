export const SHOW_LOADER = '[FFMQLoader] SHOW LOADER';
export const HIDE_LOADER = '[FFMQLoader] HIDE LOADER';

export function showLoader() {
    return {
        type: SHOW_LOADER
    }
}

export function hideLoader() {
    return {
        type: HIDE_LOADER
    }
}