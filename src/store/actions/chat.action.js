export const DISPLAY_CHAT = '[FFMQChat] DISPLAY_CHAT';
export const HIDE_CHAT = '[FFMQChat] HIDE CHAT';

export function displayChatEndGame(categoryId) {
    return {
        type: DISPLAY_CHAT,
        payload: {
            categoryId
        }
    }
}

export function hideChatEndGame() {
    return {
        type: HIDE_CHAT
    }
}