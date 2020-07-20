import {
    combineReducers
} from "redux";
import notifyReducer from "../notify/notifyReducer";
import userReducer from "../user/userReducer";

export default combineReducers({
    notifyReducer,
    userReducer
})