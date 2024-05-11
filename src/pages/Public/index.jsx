import { Outlet } from 'react-router-dom'
import AppBar from '~/components/AppBar'
import MetaData from '~/components/MetaData'

const Public = () => {
  return (
    <div>
      <MetaData title="Trello" />

      <AppBar />

      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default Public
