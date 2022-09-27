import { HIDE_LOADER, SHOW_LOADER } from '../actions/loader.action';

const initialState = {
    load: false,
};

const loader = function (state = initialState, action) {
    switch (action.type) {
        case HIDE_LOADER: {
            return {
                load: false,
            };
        }
        case SHOW_LOADER: {
            return {
                load: true,
            };
        }
        default: {
            return state;
        }
    }
};

export default loader;
