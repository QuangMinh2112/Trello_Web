import { createSlice } from '@reduxjs/toolkit'
import { fetchCreateNewColumnApi, fetchBoardDetailsApi, getAllBoards } from './board.action'

const boardSlice = createSlice({
  name: 'boards',
  initialState: {
    boards: null,
    isLoading: false
  },
  reducers: {
    updatedBoard: (state, action) => {
      state.boards = action.payload.newBoard
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBoards.pending, (state) => {
        state.isLoading = true
      })

      .addCase(getAllBoards.fulfilled, (state, action) => {
        state.isLoading = false
        state.boards = action.payload
      })
      .addCase(getAllBoards.rejected, (state) => {
        state.isLoading = false
        state.boards = []
      })
      .addCase(fetchBoardDetailsApi.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchBoardDetailsApi.fulfilled, (state, action) => {
        state.isLoading = false
        state.boards = action.payload
      })
      .addCase(fetchBoardDetailsApi.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(fetchCreateNewColumnApi.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCreateNewColumnApi.fulfilled, (state, action) => {
        state.isLoading = false
      })
      .addCase(fetchCreateNewColumnApi.rejected, (state) => {
        state.isLoading = false
      })
  }
})
export const { updatedBoard } = boardSlice.actions

export default boardSlice.reducer
