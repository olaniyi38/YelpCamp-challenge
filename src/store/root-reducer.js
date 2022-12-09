import { combineReducers } from "redux";
import { campsReducer } from "./reducers/camps/camps.reducer";
import { userReducer } from "./reducers/user/user.reducer";

export const rootReducer = combineReducers({
    user: userReducer,
    camps: campsReducer

})