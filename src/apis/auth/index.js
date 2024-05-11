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

export const apiUploadAvatar = (id, data) =>
  axios({
    url: `/upload/${id}`,
    method: 'PUT',
    data
  })

export const apiUpdateInfo = (id, data) =>
  axios({
    url: `/auth/${id}`,
    method: 'PUT',
    data
  })

export const apiResetPassword = (data) =>
  axios({
    url: '/auth/reset_pass',
    method: 'POST',
    data
  })
