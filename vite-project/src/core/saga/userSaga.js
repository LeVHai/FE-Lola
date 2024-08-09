import { takeLatest, call, put } from "redux-saga/effects";
import apiService from "../service/api";
import { getCurrentUser, getCurrentUserFailed, getCurrentUserSuccess } from "../slices/userSlice";


function* getCurrentUserSaga(action) {
  try {
    console.log(action);
    const user = yield call(apiService.getCurrentUser,action.payload);
    console.log("get profile success", user);
    yield put(getCurrentUserSuccess(user));
  } catch (error) {
    console.error("get profile failed", error);
    yield put(getCurrentUserFailed(error));
  }
}

// function* updateUserSaga({ payload }) {
//   try {
//     const updatedUser = yield call(apiService.updateProfile, payload);
//     console.log("update user success", updatedUser);
//     yield put(updateUserSuccess(updatedUser));
//   } catch (error) {
//     console.error("update user failed", error);
//     yield put(updateUserFailed(error));
//   }
// }


export function* watchFetchUser() {
  yield takeLatest(getCurrentUser.type, getCurrentUserSaga);
  // yield takeLatest(updateUser.type, updateUserSaga);
  
}
