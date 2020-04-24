import {HIDE_LOADER, SHOW_LOADER} from "../actions/loader.action";
import {HIDE_DRAWER, SHOW_DRAWER} from "../actions/global.drawer.action";

const initialState = {
    show: false
};

const globalDrawer = function (state = initialState, action) {
    switch (action.type) {
        case HIDE_DRAWER: {
            return {
                show: false
            }
        }
        case SHOW_DRAWER: {
            return {
                show: true
            }
        }
        default: {
            return state;
        }
    }
};

export default globalDrawer;