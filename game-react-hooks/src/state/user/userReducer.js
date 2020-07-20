import {
    FETCH_USER,
    LOG_OUT_USER
} from "./userTypes";

const initialState = {
    isAuthenticated: false
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER:
            return {
                isAuthenticated: true,
                    ...action.user
            }
            case LOG_OUT_USER:
                return initialState;
            default:
                return state;
    }
}

export default userReducer;