import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { authSelector } from '~/redux/auth/auth.selector'

const PrivateRoute = () => {
  const { userInfo } = useSelector(authSelector)
  return userInfo ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute
