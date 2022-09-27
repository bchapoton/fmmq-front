export const getInGameChatSocketNamespace = (categoryId) => {
    return categoryId + '-chat-in-game';
};

export const getEndGameChatSocketNamespace = (categoryId) => {
    return categoryId + '-chat-end-game';
};