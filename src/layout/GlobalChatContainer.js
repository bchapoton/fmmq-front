import React from 'react';
import {useSelector} from "react-redux";
import EndGameRoomChat from "../components/EndGameRoomChat";

export default function GlobalChatContainer() {
    const chatContext = useSelector(({chat}) => chat);

    if(chatContext && chatContext.displayed && chatContext.categoryId) {
        return (
            <EndGameRoomChat
                categoryId={chatContext.categoryId}
            />
        );
    }

    return null;
}