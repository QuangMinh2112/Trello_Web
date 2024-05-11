import { createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetMe, apiUpdateInfo, apiUploadAvatar } from '~/apis/auth'

export const getCurrentUser = createAsyncThunk('auth/current', async (id, { rejectWithValue }) => {
  const response = await apiGetMe(id)
  if (!response) return rejectWithValue(response)
  return response
})

export const updateAvatar = createAsyncThunk('auth/updateAvatar', async ({ userId, formData }, { rejectWithValue }) => {
  try {
    const response = await apiUploadAvatar(userId, formData)
    return response
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const updateInfo = createAsyncThunk('auth/updateInfo', async ({ userId, data }, { rejectWithValue }) => {
  try {
    const response = await apiUpdateInfo(userId, data)
    return response
  } catch (error) {
    return rejectWithValue(error.message)
  }
})
