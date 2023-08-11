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
import { capitalizedFirstLetter } from '~/utils/constanst'

const BoardBarStyles = {
  color:'white',
  paddingX:'5px',
  bgcolor:'transparent',
  border:'none',
  borderRadius:'4px',
  '.MuiSvgIcon-root':{
    color:'white'
  },
  '&:hover':{
    backgroundColor:'primary.50'
  }
}
function BoardBar({ board }) {
  return (
    <Box sx=
      {{
        width:'100%',
        height:(theme) => theme.trello.appBarHeight,
        display:'flex',
        alignItems:'center',
        justifyContent: 'space-between',
        gap:1,
        overflowX:'auto',
        paddingX:2,
        borderBottom:'1px solid white',
        backgroundColor:(theme) => theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
        '&::-webkit-scrollbar-track':{ m:2 }
      }}>
      <Box
        sx={{ display:'flex', alignItems:'center', gap:2 }}
      >
        <Chip
          icon={<DashboardIcon />}
          label="QuangMinh Dev"
          sx={BoardBarStyles}
          clickable
        />
        <Chip
          icon={<VpnLockIcon />}
          label={capitalizedFirstLetter(board.type)}
          sx={BoardBarStyles}
          clickable
        />
        <Chip
          icon={<AddToDriveIcon />}
          label="Add To Google Drive"
          sx={BoardBarStyles}
          clickable
        />
        <Chip
          icon={<BoltIcon />}
          label="Automation"
          sx={BoardBarStyles}
          clickable
        />
        <Chip
          icon={<FilterListIcon />}
          label="Filter"
          sx={BoardBarStyles}
          clickable
        />
      </Box>
      <Box
        sx={{ display:'flex', alignItems:'center', gap:2 }}
      >
        <Button
          variant='outlined'
          startIcon={<PersonAddIcon />}
          sx={{
            color:'white',
            borderColor:'white',
            '&:hover':{
              borderColor:'white'
            }
          }}
        >
            Invite
        </Button>
        <AvatarGroup max={5}
          sx={{
            gap:'10px',
            '.MuiAvatar-root':{
              width:34,
              height:34,
              border:'none',
              color:'white',
              cursor:'pointer'
            }
          }}
        >
          <Tooltip title='quangminh'>
            <Avatar
              alt='Remy Sharp'
              src='https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-6/334494904_909968490428262_1880365116923209069_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=GxuY1GgGvXgAX9wppBp&_nc_ht=scontent.fdad3-4.fna&oh=00_AfBVgX3sElX8bCk6maZXyWFNvylZONsVleLFPr-dDNwW8g&oe=64B326FA' />
          </Tooltip>
          <Tooltip title='messi1'>
            <Avatar
              alt='Remy Sharp'
              src='https://znews-photo.zingcdn.me/w660/Uploaded/neg_etpyole/2023_06_24/1_3.jpg' />
          </Tooltip>
          <Tooltip title='messi2'>
            <Avatar
              alt='Remy Sharp'
              src='https://www.si.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTk2MzAxOTE3NTQ1MDQ3NTc5/imago1025186751h.jpg' />
          </Tooltip>
          <Tooltip title='messi3'>
            <Avatar
              alt='Remy Sharp'
              src='https://i2-prod.mirror.co.uk/incoming/article30145602.ece/ALTERNATES/s1200c/0_Lionel-Messi-29.jpg' />
          </Tooltip>
          <Tooltip title='quangminh'>
            <Avatar
              alt='Remy Sharp'
              src='https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-6/334494904_909968490428262_1880365116923209069_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=Laf0YvXNNdQAX_685kq&_nc_ht=scontent.fdad3-4.fna&oh=00_AfBgceWtXoPTCMnd4C2oQqXLQR7qrp9c1-qSQymINL6NOw&oe=64957D3A' />
          </Tooltip>
          <Tooltip title='quangminh'>
            <Avatar
              alt='Remy Sharp'
              src='https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-6/334494904_909968490428262_1880365116923209069_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=Laf0YvXNNdQAX_685kq&_nc_ht=scontent.fdad3-4.fna&oh=00_AfBgceWtXoPTCMnd4C2oQqXLQR7qrp9c1-qSQymINL6NOw&oe=64957D3A' />
          </Tooltip>

        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar