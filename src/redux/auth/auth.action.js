import { createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetMe } from '~/apis/auth'

export const getCurrentUser = createAsyncThunk('auth/current', async (id, { rejectWithValue }) => {
  const response = await apiGetMe(id)
  if (!response) return rejectWithValue(response)
  return response
})
