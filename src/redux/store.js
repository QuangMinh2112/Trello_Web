import { configureStore } from '@reduxjs/toolkit'
import persistReducer from 'redux-persist/es/persistReducer'
import storage from 'redux-persist/lib/storage'
import authSlice from './auth/auth.slice'
import persistStore from 'redux-persist/es/persistStore'
import boardSlice from './board/board.slice'
import socketSlice from './socket/socket.slice'
const commonConfig = {
  key: 'trello/user',
  storage
}

const userConfig = {
  ...commonConfig,
  whitelist: ['isLogin', 'token', 'userInfo']
}

export const store = configureStore({
  reducer: {
    auth: persistReducer(userConfig, authSlice),
    board: boardSlice,
    socket: socketSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export const persistor = persistStore(store)
