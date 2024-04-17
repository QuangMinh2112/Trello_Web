import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import UnarchiveIcon from '@mui/icons-material/Unarchive'
import ShareIcon from '@mui/icons-material/Share'
export default function Actions() {
  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton sx={{ background: '#ebebeb', borderRadius: '5px', mb: 1 }}>
        <ListItemIcon>
          <ArrowForwardIcon />
        </ListItemIcon>
        <ListItemText primary="Move" />
      </ListItemButton>
      <ListItemButton sx={{ background: '#ebebeb', borderRadius: '5px', mb: 1 }}>
        <ListItemIcon>
          <ContentCopyIcon />
        </ListItemIcon>
        <ListItemText primary="Copy" />
      </ListItemButton>
      <ListItemButton sx={{ background: '#ebebeb', borderRadius: '5px', mb: 1 }}>
        <ListItemIcon>
          <AutoAwesomeIcon />
        </ListItemIcon>
        <ListItemText primary="Make Template" />
      </ListItemButton>
      <ListItemButton sx={{ background: '#ebebeb', borderRadius: '5px', mb: 1 }}>
        <ListItemIcon>
          <UnarchiveIcon />
        </ListItemIcon>
        <ListItemText primary="Archive" />
      </ListItemButton>
      <ListItemButton sx={{ background: '#ebebeb', borderRadius: '5px', mb: 1 }}>
        <ListItemIcon>
          <ShareIcon />
        </ListItemIcon>
        <ListItemText primary="Share" />
      </ListItemButton>
    </List>
  )
}
