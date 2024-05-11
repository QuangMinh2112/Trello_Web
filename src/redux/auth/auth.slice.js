import { createSlice } from '@reduxjs/toolkit'
import { getCurrentUser, updateAvatar, updateInfo } from './auth.action'
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLogin: false,
    isLoading: false,
    userInfo: null,
    currentUser: null,
    token: null
  },
  reducers: {
    login: (state, action) => {
      state.isLogin = action.payload.isLogin
      state.token = action.payload.token
      state.userInfo = action.payload.userInfo
    },
    logout: (state) => {
      state.isLogin = false
      state.token = null
      state.userInfo = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentUser = action.payload
        state.isLogin = true
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.isLoading = false
        state.currentUser = null
        state.token = null
      })
      .addCase(updateAvatar.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.isLoading = false
        state.userInfo.avatar = action.payload.updatedUser.avatar
      })
      .addCase(updateAvatar.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(updateInfo.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateInfo.fulfilled, (state, action) => {
        state.isLoading = false
        state.userInfo = {
          ...state.userInfo,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName
        }
      })
      .addCase(updateInfo.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})
export const { login, logout } = authSlice.actions

export default authSlice.reducer
