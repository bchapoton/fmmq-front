export const SHOW_DRAWER = '[FFMQDrawer] SHOW DRAWER';
export const HIDE_DRAWER = '[FFMQDrawer] HIDE DRAWER';

export function showGlobalDrawer() {
    return {
        type: SHOW_DRAWER,
    };
}

export function hideGlobalDrawer() {
    return {
        type: HIDE_DRAWER,
    };
}