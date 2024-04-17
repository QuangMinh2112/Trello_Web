import Box from '@mui/material/Box'
import Sidebar from './Components/Sidebar'
import Content from './Components/Content'
import { useSelector } from 'react-redux'
import Loading from '~/components/Loading'

const Home = () => {
  const { currentUser } = useSelector((state) => state.auth)

  if (!currentUser) {
    return <Loading text="Loading home..." />
  }
  return (
    <Box
      sx={{
        width: '100%',
        height: (theme) => `calc(100vh - ${theme.trello.appBarHeight})`,
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1d2125' : '#003f7e')
      }}
    >
      <Box
        sx={{
          display: 'flex',
          paddingTop: '3rem',
          justifyContent: 'center'
        }}
      >
        <Sidebar />
        <Content currentUser={currentUser} />
      </Box>
    </Box>
  )
}

export default Home
