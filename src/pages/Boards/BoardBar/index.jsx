import { Box, Button, Tooltip } from '@mui/material'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { API_ROOT, capitalizedFirstLetter } from '~/utils/constanst'
import { useEffect, useState } from 'react'
import Popper from '@mui/material/Popper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { io } from 'socket.io-client'
import { authSelector } from '~/redux/auth/auth.selector'
import { useDispatch, useSelector } from 'react-redux'
import { setSocket } from '~/redux/socket/socket.slice'
import { toast } from 'react-toastify'
import { sendInvitation } from '~/apis'

const BoardBarStyles = {
  color: 'white',
  paddingX: '5px',
  bgcolor: 'transparent',
  border: 'none',
  borderRadius: '4px',
  '.MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    backgroundColor: 'primary.50'
  }
}

function BoardBar({ board }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [inviteeEmail, setInviteeEmail] = useState('')
  const { userInfo } = useSelector(authSelector)
  const { socket } = useSelector((state) => state.socket)
  const dispatch = useDispatch()
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popper' : undefined

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }
  const handleInviteUser = async () => {
    const boardName = board?.title
    const boardId = board?._id
    const inviteerName = userInfo?.firstName + ' ' + userInfo?.lastName
    if (userInfo?.email === inviteeEmail) {
      toast.warning('You can not invite yourself')
    } else {
      try {
        const res = await sendInvitation({ email: inviteeEmail, boardId })
        const invitationId = res?.data?._id
        if (res?.success) {
          toast.success('Send invitation successfully!!!')
        }
        socket?.emit('sendNotification', {
          inviteerEmail: userInfo?.email,
          inviteeEmail,
          boardName,
          boardId,
          inviteerName,
          status: 'pending',
          invitationId
        })
      } catch (error) {
        toast({
          title: 'Error Occured!',
          description: 'Failed to send the invitation',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom'
        })
      }
    }
  }
  useEffect(() => {
    const socket = io(API_ROOT)
    dispatch(setSocket(socket))

    return () => {
      socket?.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    socket?.emit('newUser', userInfo?.email)
  }, [socket, userInfo])

  return (
    <Box
      sx={{
        width: '100%',
        height: (theme) => theme.trello.appBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 1,
        overflowX: 'auto',
        paddingX: 2,
        borderBottom: '1px solid white',
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        '&::-webkit-scrollbar-track': { m: 2 }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip icon={<DashboardIcon />} label={capitalizedFirstLetter(board?.title)} sx={BoardBarStyles} clickable />
        <Chip icon={<VpnLockIcon />} label={capitalizedFirstLetter(board?.type)} sx={BoardBarStyles} clickable />
        <Chip icon={<AddToDriveIcon />} label="Add To Google Drive" sx={BoardBarStyles} clickable />
        <Chip icon={<BoltIcon />} label="Automation" sx={BoardBarStyles} clickable />
        <Chip icon={<FilterListIcon />} label="Filter" sx={BoardBarStyles} clickable />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          variant="outlined"
          aria-describedby={id}
          startIcon={<PersonAddIcon />}
          onClick={handleClick}
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': {
              borderColor: 'white'
            }
          }}
        >
          Invite
        </Button>
        <Popper
          id={id}
          open={open}
          anchorEl={anchorEl}
          sx={{
            width: '300px',

            '& .MuiBox-root': {
              border: 'none',
              borderRadius: 1,
              mt: 1
            }
          }}
        >
          <Box sx={{ border: 1, p: 1, bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : 'white') }}>
            <Typography
              sx={{ fontWeight: 'bold', color: (theme) => (theme.palette.mode === 'dark' ? 'white' : 'black'), pb: 1 }}
            >
              Invite User to this board
            </Typography>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              fullWidth={true}
              value={inviteeEmail}
              onChange={(e) => setInviteeEmail(e.target.value)}
            />
            <Box sx={{ display: 'flex', justifyContent: 'end', pt: 1 }}>
              <Button
                variant="outlined"
                aria-describedby={id}
                startIcon={<PersonAddIcon />}
                onClick={handleInviteUser}
                sx={{
                  color: 'white',
                  backgroundColor: 'blue',
                  borderColor: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'blue'
                  }
                }}
              >
                Invite
              </Button>
            </Box>
          </Box>
        </Popper>
        <AvatarGroup
          max={5}
          sx={{
            gap: '10px',
            '.MuiAvatar-root': {
              width: 34,
              height: 34,
              border: 'none',
              color: 'white',
              cursor: 'pointer'
            }
          }}
        >
          <Tooltip title="quangminh">
            <Avatar
              alt="Remy Sharp"
              src="https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-6/334494904_909968490428262_1880365116923209069_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=GxuY1GgGvXgAX9wppBp&_nc_ht=scontent.fdad3-4.fna&oh=00_AfBVgX3sElX8bCk6maZXyWFNvylZONsVleLFPr-dDNwW8g&oe=64B326FA"
            />
          </Tooltip>
          <Tooltip title="messi1">
            <Avatar
              alt="Remy Sharp"
              src="https://znews-photo.zingcdn.me/w660/Uploaded/neg_etpyole/2023_06_24/1_3.jpg"
            />
          </Tooltip>
          <Tooltip title="messi2">
            <Avatar
              alt="Remy Sharp"
              src="https://www.si.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTk2MzAxOTE3NTQ1MDQ3NTc5/imago1025186751h.jpg"
            />
          </Tooltip>
          <Tooltip title="messi3">
            <Avatar
              alt="Remy Sharp"
              src="https://i2-prod.mirror.co.uk/incoming/article30145602.ece/ALTERNATES/s1200c/0_Lionel-Messi-29.jpg"
            />
          </Tooltip>
          <Tooltip title="quangminh">
            <Avatar
              alt="Remy Sharp"
              src="https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-6/334494904_909968490428262_1880365116923209069_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=Laf0YvXNNdQAX_685kq&_nc_ht=scontent.fdad3-4.fna&oh=00_AfBgceWtXoPTCMnd4C2oQqXLQR7qrp9c1-qSQymINL6NOw&oe=64957D3A"
            />
          </Tooltip>
          <Tooltip title="quangminh">
            <Avatar
              alt="Remy Sharp"
              src="https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-6/334494904_909968490428262_1880365116923209069_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=Laf0YvXNNdQAX_685kq&_nc_ht=scontent.fdad3-4.fna&oh=00_AfBgceWtXoPTCMnd4C2oQqXLQR7qrp9c1-qSQymINL6NOw&oe=64957D3A"
            />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
