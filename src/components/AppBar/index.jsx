import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import ModeSelect from '~/components/ModeSelect'
import AppsIcon from '@mui/icons-material/Apps'
import SvgIcon from '@mui/material/SvgIcon'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Profile from '../Menus/Profile'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import withBaseLogic from '~/hoc'
import { useEffect, useState } from 'react'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import { useSelector } from 'react-redux'
import { acceptInvitation, getAllInvitations, rejectInvitation } from '~/apis'
import NotInterestedIcon from '@mui/icons-material/NotInterested'
import DoneIcon from '@mui/icons-material/Done'
import { authSelector } from '~/redux/auth/auth.selector'
import Chip from '@mui/material/Chip'
import moment from 'moment'
// eslint-disable-next-line react-refresh/only-export-components
function AppBar({ navigate }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const { socket } = useSelector((state) => state.socket)
  const { userInfo } = useSelector(authSelector)
  const [notifications, setNotifications] = useState([])

  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const fetchAllNotifications = async () => {
    const response = await getAllInvitations()
    const findUsers = response?.filter((notification) => notification.inviteeId[0]._id === userInfo._id)
    setNotifications(findUsers)
  }

  useEffect(() => {
    socket?.on('getNotification', (data) => {
      const isNotificationExists = notifications.some((notification) => notification._id === data._id)
      if (!isNotificationExists) {
        setNotifications((prev) => [...prev, data])
      }
    })

    fetchAllNotifications()
    return () => {
      socket?.off('getNotification')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket])

  const handleConfirmNotification = async (type, idNotification, boardId) => {
    if (type === 'accept') {
      await acceptInvitation(idNotification)
      navigate(`board/${boardId}`)
    } else if (type === 'reject') {
      await rejectInvitation(idNotification)
    }
    setNotifications((prevNotifications) => {
      const updatedNotifications = prevNotifications?.map((notification) => {
        if (notification._id === idNotification) {
          return {
            ...notification,
            status: type === 'reject' ? 'rejected' : 'accepted'
          }
        }
        return notification
      })
      return updatedNotifications
    })
  }

  return (
    <Box
      px={2}
      sx={{
        width: '100%',
        height: (theme) => theme.trello.appBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 1,
        overflowX: 'auto',
        '&::-webkit-scrollbar-track': { m: 2 },
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0')
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <AppsIcon sx={{ color: 'white' }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer' }} onClick={() => navigate('/')}>
          <SvgIcon component={TrelloIcon} fontSize="small" inheritViewBox sx={{ color: 'white' }} />
          <Typography variant="span" sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }}>
            Trello
          </Typography>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'flex', gap: 1 } }}>
          {/* <Workspaces />
          <Recent />
          <Starred />
          <Teamplate /> */}
          {/* <Button
            sx={{
              color: 'white',
              border: 'none',
              '&:hover': {
                border: 'none'
              }
            }}
            variant="outlined"
            startIcon={<AddIcon />}
          >
            Create
          </Button> */}
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField
          id="outlined-search"
          label="Search..."
          type="text"
          size="small"
          sx={{
            minWidth: '120px',
            '& label': { color: 'white' },
            '& label.Mui-focused': { color: 'white' },
            '& input': { color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'white' },
              '&:hover fieldset': { borderColor: 'white' },
              '&.Mui-focused fieldset': { borderColor: 'white' }
            }
          }}
        />
        <ModeSelect />
        <Tooltip title="Notification">
          <Badge
            color="secondary"
            variant={`${notifications?.length > 0 ? 'dot' : 'standard'}`}
            sx={{ cursor: 'pointer' }}
            onClick={handleClick}
          >
            <NotificationsNoneIcon sx={{ color: 'white' }} />
          </Badge>
        </Tooltip>
        <Menu
          id="basic-menu-workspace"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button'
          }}
        >
          {notifications?.length > 0 ? (
            notifications.map((notification, index) => [
              <MenuItem key={notification?._id}>
                <ListItemIcon>
                  <GroupAddIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>
                  <Typography sx={{ paddingBottom: 1 }}>
                    <Typography variant="span" sx={{ fontWeight: 'bold' }}>
                      {notification?.inviteerName ||
                        notification?.inviterId[0]?.firstName + '' + notification?.inviterId[0]?.lastName}
                    </Typography>{' '}
                    had invited you to join the board
                  </Typography>
                  <Typography variant="span" sx={{ fontWeight: 'bold' }}>
                    {notification?.boardName}
                  </Typography>

                  {notification?.status === 'pending' ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end', gap: 1, pb: 1 }}>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() =>
                          handleConfirmNotification('accept', notification?._id, notification?.boardId[0]?._id)
                        }
                      >
                        Accept
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleConfirmNotification('reject', notification?._id)}
                      >
                        Reject
                      </Button>
                    </Box>
                  ) : notification?.status === 'rejected' ? (
                    <Box sx={{ display: 'flex', justifyContent: 'end', pb: 1 }}>
                      <Chip icon={<NotInterestedIcon />} label="Rejected" />
                    </Box>
                  ) : notification?.status === 'accepted' ? (
                    <Box sx={{ display: 'flex', justifyContent: 'end', pb: 1 }}>
                      <Chip
                        icon={
                          <DoneIcon
                            sx={{
                              '&.MuiChip-icon': {
                                color: 'white !important'
                              }
                            }}
                          />
                        }
                        label="Accepted"
                        color="success"
                        sx={{
                          '& .MuiChip-label': {
                            color: 'white'
                          }
                        }}
                      />
                    </Box>
                  ) : (
                    <></>
                  )}

                  <Typography sx={{ textAlign: 'end', fontSize: '13px !important' }}>
                    {' '}
                    {moment(notification?.createdAt).format('ddd,MMM DD, YYYY h:mmA')}
                  </Typography>
                </ListItemText>
              </MenuItem>,
              index !== notifications.length - 1 && <Divider key={`divider-${notification?._id}`} />
            ])
          ) : (
            <MenuItem>
              <ListItemText>No information (You have to create new board to receiver new board).</ListItemText>
            </MenuItem>
          )}
        </Menu>
        <Tooltip title="Helper" sx={{ cursor: 'pointer', color: 'white' }}>
          <HelpOutlineIcon />
        </Tooltip>
        <Profile />
      </Box>
    </Box>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export default withBaseLogic(AppBar)
