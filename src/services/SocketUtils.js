import socketIOClient from "socket.io-client";

export const getSocket = (namespace) => {
    const socket = socketIOClient(
        'http://localhost:8080/' + namespace,
        {
            transports: ['websocket'],
            transportOptions: {
                polling: {
                    extraHeaders: {
                        'x-header-test': 'abc'
                    }
                }
            }
        }
    );

    return socket;
};