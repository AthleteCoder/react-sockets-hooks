export const SHOW_ERROR_NOTIFY = "[Notify] Show Error";
export const SHOW_SUCCESS_NOTIFY = "[Notify] Show Succes";
export const RESET_NOTIFY = "[Notify] Reset";

export const showError = (err) => {
    return {
        type: SHOW_ERROR_NOTIFY,
        error: err
    }
}

export const showSuccess = (success) => {
    return {
        type: SHOW_SUCCESS_NOTIFY,
        success: success
    }
}

export const resetNotify = () => {
    return {
        type: RESET_NOTIFY
    }
}