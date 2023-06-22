import { Badge, Box, Button, TextField, Typography } from '@mui/material'
import ModeSelect from '~/components/ModeSelect'
import AppsIcon from '@mui/icons-material/Apps'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import SvgIcon from '@mui/material/SvgIcon'
import Workspaces from '~/components/Menus/Workspaces'
import Recent from '~/components/Menus/Recent'
import Starred from '../Menus/Starred'
import Teamplate from '../Menus/Teamplate'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Profile from '../Menus/Profile'
function AppBar() {
  return (
    <Box px={2} sx=
      {{
        width:'100%',
        height:(theme) => theme.trello.appBarHeight,
        display:'flex',
        alignItems:'center',
        justifyContent: 'space-between'
      }}>
      <Box sx={{ display:'flex', alignItems:'center', gap:2 }}>
        <AppsIcon sx={{ color:'primary.main' }} />
        <Box sx={{ display:'flex', alignItems:'center', gap:0.5 }}>
          <SvgIcon component={TrelloIcon} fontSize="small" inheritViewBox sx={{ color:'primary.main' }} />
          <Typography variant='span' sx={{ fontSize:'1.2rem', fontWeight:'bold', color:'primary.main' }}
          >Trello
          </Typography>
        </Box>
        <Workspaces />
        <Recent />
        <Starred />
        <Teamplate />
        <Button variant="outlined">Create</Button>
      </Box>

      <Box sx={{ display:'flex', alignItems:'center', gap:2 }}>
        <TextField id="outlined-search" label="Search..." type="search" size='small' />
        <ModeSelect />
        <Tooltip title="Notification">
          <Badge color="secondary" variant="dot" sx={{ cursor:'pointer' }}>
            <NotificationsNoneIcon sx={{ color:'primary.main' }} />
          </Badge>
        </Tooltip>
        <Tooltip title="Helper" sx={{ cursor:'pointer', color:'primary.main' }}>
          <HelpOutlineIcon />
        </Tooltip>
        <Profile />
      </Box>
    </Box>
  )
}

export default AppBar