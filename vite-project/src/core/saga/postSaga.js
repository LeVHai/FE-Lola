import { call, put, takeLatest } from "redux-saga/effects";
import apiService from "../service/api";
import {
  createPost,
  createPostFailed,
  createPostSuccess,
  getCommunityPost,
  getCommunityPostFailed,
  getCommunityPostSuccess,
  getMyPost,
  getMyPostFailed,
  getMyPostSuccess,
  setHasMore,
} from "../slices/postSlice";

function* communityPostSaga({ payload }) {
  try {
    const response = yield call(apiService.getCommunityPost, payload);
    if (response.length === 0) {
      yield put(setHasMore({ type: "2", hasMore: false }));
    } else {
      yield put(getCommunityPostSuccess(response));
    }
  } catch (error) {
    yield put(getCommunityPostFailed(error));
  }
}
function* createPostSaga({ payload }) {
  const { data, access_token, user } = payload;
  try {
    const res = yield call(apiService.createPost, { data, access_token });
    const newData = { ...res, name: user.name, avatar: user.avatar,like: false ,like_count: 0 };
    console.log(newData);
    yield put(createPostSuccess(newData));
  } catch (error) {
    yield put(createPostFailed(error));
  }
}
function* getMyPostSaga({ payload }) {
  try {
    const response = yield call(apiService.getPost, payload);
    if (response.length === 0) {
      yield put(setHasMore({ type: "1", hasMore: false }));
    } else {
      yield put(getMyPostSuccess(response));
    }
  } catch (error) {
    yield put(getMyPostFailed(error));
  }
}

export function* watchPostsSaga() {
  yield takeLatest(getCommunityPost.type, communityPostSaga);
  yield takeLatest(getMyPost.type, getMyPostSaga);
  yield takeLatest(createPost.type, createPostSaga);
}
