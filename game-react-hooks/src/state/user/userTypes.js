export const FETCH_USER = "[User] Fetch";
export const LOG_OUT_USER = "[User Logout";

export const fetchUser = (user) => {
    return {
        type: FETCH_USER,
        user: user
    }
}

export const logoutUser = () => {
    return {
        type: LOG_OUT_USER
    }
}