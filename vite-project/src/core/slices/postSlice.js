import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    data: [],
    isError: false,
    page: 1,
    limit: 3,
    hasMore: true,
  },
  community: {
    data: [],
    isError: false,
    page: 1,
    limit: 5,
    hasMore: true,
  },
  isLoading: false,
  loadingCreatePost:false
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setState(state,action){
      return{...state,...action.payload}
    },
    createPost(state){
      state.loadingCreatePost = true;
    },
   createPostSuccess(state, action) {
    console.log(action);
    const newPost = action.payload;
    console.log(newPost);
    state.user.data.unshift(newPost)
    state.community.data.unshift(newPost)
    state.loadingCreatePost = false;
    },
   createPostFailed(state, action) {
      state.loadingCreatePost = false;
    },
    getMyPost(state, action) {
      state.isLoading = true;
    },
    getMyPostSuccess(state, action) {
      const newData = action.payload;
      const currentData = state.user.data;
      const currentIds = new Set(currentData.map((item) => item._id));
      const filteredData = newData.filter(
        (newItem) => !currentIds.has(newItem._id)
      );
      state.user.data = [...state.user.data, ...filteredData];
      state.user.page += 1;
      state.isLoading = false;
    },
    getMyPostFailed(state, action) {
      state.isLoading = false;
      state.user.isError = true;
    },
    getCommunityPost(state, action) {
      state.isLoading = true;
    },
    getCommunityPostSuccess(state, action) {
      const newData = action.payload;
      const currentData = state.community.data;
      const currentIds = new Set(currentData.map((item) => item._id));
      const filteredData = newData.filter(
        (newItem) => !currentIds.has(newItem._id)
      );
      state.community.data = [...state.community.data, ...filteredData];
      state.community.page += 1;
      state.isLoading = false;
    },
    getCommunityPostFailed(state, action) {
      state.isLoading = false;
      state.community.isError = true;
    },
    setHasMore(state, action) {
      if(action.payload.type === "1"){
        state.user.hasMore = action.payload.hasMore;
      }
      if(action.payload.type === "2"){
        state.community.hasMore = action.payload.hasMore;
      }
     
      state.isLoading = false;

    },
  },
});

export const {
  setState,
  createPost,
  createPostSuccess,
  createPostFailed,
  setHasMore,
  getCommunityPost,
  getCommunityPostSuccess,
  getCommunityPostFailed,
  getMyPost,
  getMyPostSuccess,
  getMyPostFailed,
} = postSlice.actions;
export default postSlice.reducer;
