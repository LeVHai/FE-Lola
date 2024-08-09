import { put, call, fork, takeLatest } from "redux-saga/effects";
import apiService from "../service/api";
import {
  login,
  loginFailed,
  loginSuccess,
  logout,
  logoutFailed,
  logoutSuccess,
} from "../slices/authSlice";

function* handleLogin({ payload }) {
  try {
    const token = yield call(apiService.login, payload);
    yield put(loginSuccess(token));
  } catch (error) {
    if (error.name === "AxiosError" && error.response.status === 422) {
      yield put(loginFailed(error.response.data.error));
    }
  }
}

function* handleLogout() {
  try {
    yield call(apiService.logout);
    yield put(logoutSuccess());
  } catch (error) {
    yield put(logoutFailed(error));
  }
}
function* watchLoginFollow() {
  yield takeLatest(login.type, handleLogin);
  yield takeLatest(logout.type, handleLogout);
}

export function* authSaga() {
  yield fork(watchLoginFollow);
}
