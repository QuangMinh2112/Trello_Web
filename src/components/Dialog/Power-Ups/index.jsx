import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import AspectRatioIcon from '@mui/icons-material/AspectRatio'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import AddIcon from '@mui/icons-material/Add'

export default function PowerUps() {
  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton sx={{ background: '#ebebeb', borderRadius: '5px', mb: 1 }}>
        <ListItemIcon>
          <AspectRatioIcon />
        </ListItemIcon>
        <ListItemText primary="Card size" />
      </ListItemButton>
      <ListItemButton sx={{ background: '#ebebeb', borderRadius: '5px', mb: 1 }}>
        <ListItemIcon>
          <AddToDriveIcon />
        </ListItemIcon>
        <ListItemText primary="Google Driver" />
      </ListItemButton>
      <ListItemButton sx={{ background: '#ebebeb', borderRadius: '5px', mb: 1 }}>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText primary="Add Power-Ups" />
      </ListItemButton>
    </List>
  )
}
