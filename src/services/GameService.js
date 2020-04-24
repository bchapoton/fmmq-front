import forge from "node-forge";
import {getRestClient} from "./NetworkUtils";

export const sortPayersInRoom = (playersInRoom) => {
    if (!playersInRoom || playersInRoom.length === 0) {
        return [];
    }

    return playersInRoom.slice().sort((item1, item2) => {
        const score1 = item1.score ? item1.score : 0;
        const score2 = item2.score ? item2.score : 0;
        return (score1 - score2) * -1; // desc sorting
    });
};

export const decrypt = (data, key, iv) => {
    const cipher = forge.rc2.createDecryptionCipher(key);
    cipher.start(iv);
    cipher.update(data);
    cipher.finish();
    return cipher.output.toString();
};

export const getGame = (gameId, onSuccess, onError) => {
    return getRestClient()
        .get(`games/over/${gameId}`)
        .then(onSuccess)
        .catch(onError);
};

export const listGames = (limit, onSuccess) => {
    return getRestClient(true, {pager: `0-${limit}`})
        .get('games/podiums')
        .then(onSuccess);
};