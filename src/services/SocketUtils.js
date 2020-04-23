import socketIOClient from "socket.io-client";
import NetworkConfig from "../config/NetworkConfig";

export const getSocket = (namespace) => {
    const socket = socketIOClient(
        NetworkConfig.ApiUrl + namespace,
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
