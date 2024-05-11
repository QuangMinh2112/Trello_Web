import { useState } from 'react'
import { Avatar, Box, IconButton, Tooltip } from '@mui/material'
import Menu from '@mui/material/Menu'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import { Logout } from '@mui/icons-material'
import { checkLength } from '~/utils/constanst'
import { useSelector } from 'react-redux'
import { authSelector } from '~/redux/auth/auth.selector'
import withBaseLogic from '~/hoc'
import { logout } from '~/redux/auth/auth.slice'
import { NavLink } from 'react-router-dom'
// eslint-disable-next-line react-refresh/only-export-components
function Profile({ dispatch, navigate }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const { userInfo } = useSelector(authSelector)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <Box>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ padding: 0 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar
            sx={{ width: 34, height: 34 }}
            src={userInfo?.avatar}
            alt={`${userInfo?.firstName} ${userInfo?.lastName}`}
          ></Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu-profile"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        <NavLink to="/setting/account">
          <MenuItem
            onClick={handleClose}
            sx={{ fontWeight: 'bold', color: (theme) => (theme.palette.mode === 'dark' ? 'white' : 'black') }}
          >
            Account
          </MenuItem>
        </NavLink>
        <MenuItem onClick={handleClose}>
          <Avatar
            sx={{ width: 34, height: 34 }}
            src={userInfo?.avatar}
            alt={`${userInfo?.firstName} ${userInfo?.lastName}`}
          ></Avatar>
          <Box>
            <MenuItem onClick={handleClose} sx={{ pointerEvents: 'none' }}>
              {`${userInfo?.firstName} ${userInfo?.lastName}`}
            </MenuItem>
            <Tooltip title={userInfo?.email} placement="top">
              <MenuItem onClick={handleClose}>{checkLength(userInfo?.email)}</MenuItem>
            </Tooltip>
          </Box>
        </MenuItem>
        <Divider />

        <MenuItem
          onClick={() => {
            dispatch(logout()), navigate('/login')
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export default withBaseLogic(Profile)
