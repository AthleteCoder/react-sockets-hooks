import {
    SHOW_ERROR_NOTIFY,
    SHOW_SUCCESS_NOTIFY,
    RESET_NOTIFY
} from "./notifyTypes";

const initialState = {
    error: false,
    success: false,
    message: null
}

const notifyReducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case SHOW_ERROR_NOTIFY:
            return {
                error: true, success: false, message: action.error
            };
        case SHOW_SUCCESS_NOTIFY:
            return {
                error: false, success: true, message: action.success
            };
        case RESET_NOTIFY:
            return initialState;
        default:
            return initialState;
    }
}

export default notifyReducer;