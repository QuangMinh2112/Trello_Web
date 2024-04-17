import { Outlet } from 'react-router-dom'
import AppBar from '~/components/AppBar'

const Public = () => {
  return (
    <div>
      <AppBar />

      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default Public
