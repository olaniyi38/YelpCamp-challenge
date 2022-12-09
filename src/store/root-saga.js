import { all, call } from "redux-saga/effects";
import { campsSaga } from "./reducers/camps/camps.saga";
import { userSaga } from "./reducers/user/user.saga";

export function* rootSaga() {
   yield all([call(userSaga),call(campsSaga)])
}