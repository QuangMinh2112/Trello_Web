import { createAsyncThunk } from '@reduxjs/toolkit'
import { isEmpty } from 'lodash'
import { createNewColumnAPI, fetchBoardDetails, getAllBoardAPI } from '~/apis'
import { generatePlaceholderCard } from '~/utils/constanst'
import { mapOrder } from '~/utils/sorts'
import { updatedBoard } from './board.slice'

export const getAllBoards = createAsyncThunk('boards/getAll', async (data, { rejectWithValue }) => {
  const response = await getAllBoardAPI()
  if (!response.success) rejectWithValue(response)
  return response
})

export const fetchBoardDetailsApi = createAsyncThunk('boards/fetchBoardDetails', async (id, { rejectWithValue }) => {
  const board = await fetchBoardDetails(id)
  if (!board) return rejectWithValue(board)
  board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')

  board?.columns?.forEach((column) => {
    if (isEmpty(column.cards)) {
      column.cards = [generatePlaceholderCard(column)]
      column.cardOrderIds = [generatePlaceholderCard(column)._id]
    } else {
      column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
    }
  })
  return board
})

export const fetchCreateNewColumnApi = createAsyncThunk(
  'boards/createNewColumn',
  async ({ title, boardId }, { rejectWithValue, dispatch, getState }) => {
    try {
      const createdColumn = await createNewColumnAPI({
        title,
        boardId: boardId
      })

      const state = getState()
      createdColumn.cards = [generatePlaceholderCard(createdColumn)]
      createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]
      const newBoard = { ...state.board.boards }
      newBoard?.columns?.push(createdColumn)
      newBoard?.columnOrderIds?.push(createdColumn._id)
      // Dispatch an action to update the board state
      dispatch(updatedBoard(newBoard))

      return createdColumn
    } catch (error) {
      return rejectWithValue('Failed to create new column')
    }
  }
)
