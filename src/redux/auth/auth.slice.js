import { createSlice } from '@reduxjs/toolkit'
import { getCurrentUser } from './auth.action'
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
      state.userInfo = action.payload
    },
    logout: (state) => {
      state.isLogin = false
      state.token = null
      state.userInfo = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrentUser.pending, (state) => {
      state.isLoading = true
    })

    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.currentUser = action.payload
      state.isLogin = true
    })
    builder.addCase(getCurrentUser.rejected, (state) => {
      state.isLoading = false
      state.currentUser = null
      state.token = null
    })
  }
})
export const { login, logout } = authSlice.actions

export default authSlice.reducer
