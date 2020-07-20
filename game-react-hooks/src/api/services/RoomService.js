import http from "../http";

const instance = http();

const baseUrl = "room";

export const getAllRooms = () => {
    return instance.get(baseUrl);
}

export const newGame = (title, createdBy) => {
    return instance.post(baseUrl, {
        title,
        createdBy
    });
}

export const joinGame = (gameId) => {
    return instance.get(baseUrl + "/join/" + gameId)
}

export const getGameState = gameId => {
    return instance.get(baseUrl + "/" + gameId + "/state");
}