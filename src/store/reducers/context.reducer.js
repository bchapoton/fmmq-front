import {CLEAR_USER_DATA, LOGGED_IN, LOGGED_OUT, SET_USER_DATA} from "../actions/context.action";

const initialState = {
    loggedIN: false,
    user: null
};

const context = function (state = initialState, action) {
    switch ( action.type )
    {
        case LOGGED_IN:
        {
            return Object.assign(
                state,
                {
                    loggedIN: true
                }
            );
        }
        case LOGGED_OUT:
        {
            return Object.assign({}, initialState);
        }
        case SET_USER_DATA:
        {
            return {
                loggedIN: true,
                user: action.payload
            };
        }
        case CLEAR_USER_DATA:
        {
            return Object.assign({}, initialState);
        }
        default:
        {
            return state;
        }
    }
};

export default context;