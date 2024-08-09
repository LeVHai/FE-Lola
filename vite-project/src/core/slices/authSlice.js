import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    isLoggedIn: false,
    isLoading: false,
    error: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
reducers:{
    login(state){
        state.isLoading = true
    },
    loginSuccess(state, action){
        state.isLoggedIn =true
        state.isLoading = false
        state.token = action.payload
    },
    loginFailed(state , action){
        state.isLoading = false
        state.error = action.payload
    },
    logout(state){
        state.isLoading = true
    },
    logoutSuccess(state){
        state.isLoggedIn = false
        state.token = null
        state.isLoading = false
    },
    logoutFailed(state){
        state.isLoading = false
    },
    refreshToken(state,action){
        state.token = action.payload
    }
}

})
export const { login, loginSuccess, loginFailed, logout  ,logoutSuccess,logoutFailed,refreshToken} = authSlice.actions;

export default authSlice.reducer