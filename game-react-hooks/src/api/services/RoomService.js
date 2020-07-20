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