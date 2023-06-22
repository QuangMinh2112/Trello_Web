import { Box } from '@mui/material'

function BoardContent() {
  return (
    <Box sx=
      {{ backgroundColor:'primary.main',
        width:'100%',
        height:(theme) => `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`,
        display:'flex',
        alignItems:'center'
      }}>
      <h2>Board content</h2>
    </Box>
  )
}

export default BoardContent