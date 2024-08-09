import { all } from "redux-saga/effects";
import { authSaga } from "./authSaga";
import { watchFetchUser } from "./userSaga";
import { watchPostsSaga } from "./postSaga";


export default function* rootSaga() {
  yield all([authSaga(),watchFetchUser(),watchPostsSaga()]);
}
