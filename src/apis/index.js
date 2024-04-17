import axios from '../axios'
import { API_ROOT } from '~/utils/constanst'

export const fetchBoardDetails = async (boardId) => {
  const response = await axios({
    url: `${API_ROOT}/v1/boards/${boardId}`,
    method: 'GET'
  })
  return response
}

export const getAllBoardAPI = async () => {
  const response = await axios({
    url: `${API_ROOT}/v1/boards`,
    method: 'GET'
  })
  return response
}

export const updateBoardDetailsAPI = async (boardId, updateData) => {
  const response = await axios({
    url: `${API_ROOT}/v1/boards/${boardId}`,
    method: 'PUT',
    data: updateData
  })
  return response
}
export const updateColumnDetailsAPI = async (columnId, updateData) => {
  const response = await axios({
    url: `${API_ROOT}/v1/columns/${columnId}`,
    method: 'PUT',
    data: updateData
  })
  return response
}
export const updateColumnTitleAPI = async (columnId, updateData) => {
  const response = await axios({
    url: `${API_ROOT}/v1/columns/${columnId}/title`,
    method: 'PUT',
    data: updateData
  })
  return response
}
export const deleteColumnAPI = async (columnId) => {
  const response = await axios({
    url: `${API_ROOT}/v1/columns/${columnId}`,
    method: 'DELETE'
  })
  return response
}
export const moveCardBetweenTwoColumnsAPI = async (updateData) => {
  const response = await axios({
    url: `${API_ROOT}/v1/boards/support/moving_card`,
    method: 'PUT',
    data: updateData
  })
  return response
}

export const createNewColumnAPI = async (newColumnData) => {
  const response = await axios({
    url: `${API_ROOT}/v1/columns`,
    method: 'POST',
    data: newColumnData
  })
  return response
}

export const createNewCardAPI = async (newCardData) => {
  const response = await axios({
    url: `${API_ROOT}/v1/cards`,
    method: 'POST',
    data: newCardData
  })
  return response
}

export const createNewBoard = async (newBoardData) => {
  const response = await axios({
    url: `${API_ROOT}/v1/boards`,
    method: 'POST',
    data: newBoardData
  })
  return response
}

export const updateCardDetail = async (cardId, newCardData) => {
  const response = await axios({
    url: `${API_ROOT}/v1/cards/edit_card/${cardId}`,
    method: 'PUT',
    data: newCardData
  })

  return response
}

export const sendInvitation = async (payload) => {
  const response = await axios({
    url: `${API_ROOT}/v1/invitation/invite`,
    method: 'POST',
    data: payload
  })

  return response
}

export const getAllInvitations = async () => {
  const response = await axios({
    url: `${API_ROOT}/v1/invitation`,
    method: 'GET'
  })

  return response
}

export const acceptInvitation = async (invitationId) => {
  const response = await axios({
    url: `${API_ROOT}/v1/invitation/${invitationId}/accept`,
    method: 'PUT'
  })

  return response
}

export const rejectInvitation = async (invitationId) => {
  const response = await axios({
    url: `${API_ROOT}/v1/invitation/${invitationId}/reject`,
    method: 'PUT'
  })

  return response
}
