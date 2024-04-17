import axios from '../../axios'

export const apiLoginUser = (data) =>
  axios({
    url: '/auth',
    method: 'POST',
    data
  })
export const apiRegisterUser = (data) =>
  axios({
    url: '/auth/register',
    method: 'POST',
    data
  })

export const apiGetMe = (id) =>
  axios({
    url: `/auth/${id}`,
    method: 'GET'
  })
