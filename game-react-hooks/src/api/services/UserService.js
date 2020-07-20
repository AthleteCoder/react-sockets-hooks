import http from "../http"

const baseUrl = "user";

export const LoginUser = (email, password) => {
    return http().post(baseUrl + "/login", {
        email,
        password
    });
}

export const RegisterUser = (email, password) => {
    return http().post(baseUrl, {
        email,
        password
    });
}

export const GetUser = () => {
    return http(true).get(baseUrl);
}