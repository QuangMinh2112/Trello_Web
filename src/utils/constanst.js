export const capitalizedFirstLetter = (str) => {
  if (!str) return ''
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`
}

export const generatePlaceholderCard = (column) => {
  return {
    _id: `${column._id}-placeholder-card`,
    boardId: column.boardId,
    columnId: column._id,
    FE_Placeholder: true
  }
}

export const checkLength = (str) => {
  if (str?.length > 20) {
    return `${str.slice(0, 20)}...`
  } else {
    return str
  }
}

let apiRoot = ''

if (process.env.BUILD_MODE === 'dev') {
  apiRoot = 'http://localhost:8017'
}

if (process.env.BUILD_MODE === 'production') {
  apiRoot = 'https://trelo-api.onrender.com'
}

export const API_ROOT = apiRoot
