import { DISPLAY_CHAT, HIDE_CHAT } from '../actions/chat.action';

const initialState = {
    displayed: false,
    categoryId: null,
};

const chat = function (state = initialState, action) {
    switch (action.type) {
        case DISPLAY_CHAT: {
            return Object.assign({ displayed: true }, action.payload);
        }
        case HIDE_CHAT: {
            return Object.assign({}, initialState);
        }
        default: {
            return state;
        }
    }
};

export default chat;
