import Container from '@mui/material/Container'
import { mockData } from '~/apis/mock-api'
import AppBar from '~/components/AppBar'
import BoardBar from '~/pages/Boards/BoardBar'
import BoardContent from '~/pages/Boards/BoardContent/BoardContent'

function Board() {
  return (
    <Container disableGutters maxWidth={false} sx={{ height:'100vh' }}>
      <AppBar />
      <BoardBar board={mockData?.board}/>
      <BoardContent board={mockData?.board} />
    </Container>
  )
}

export default Board