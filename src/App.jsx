/* eslint-disable react-refresh/only-export-components */
import Board from '~/pages/Boards/_id'
import { Route, Routes } from 'react-router-dom'
import Login from '~/pages/Auth/Login'
import Home from '~/pages/Home'
import Public from './pages/Public'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import withBaseLogic from './hoc'
import { getCurrentUser } from './redux/auth/auth.action'
import { authSelector } from './redux/auth/auth.selector'
import PrivateRoute from './components/PrivateRouter'
import Register from './pages/Auth/Register'

function App({ dispatch, location }) {
  const { userInfo } = useSelector(authSelector)

  useEffect(() => {
    if (
      location.pathname !== '/login' ||
      location.pathname !== '/register' ||
      location.pathname !== 'https://trello-web-quang-minh.vercel.app/login'
    ) {
      dispatch(getCurrentUser(userInfo?._id))
    }
  }, [dispatch, location, userInfo?._id])

  return (
    <>
      <Routes>
        <Route path="/" element={<Public />}>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/board/:id" element={<Board />} />
          </Route>
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default withBaseLogic(App)
