import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
export default function ActionListCard() {
  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton sx={{ background: '#ebebeb', borderRadius: '5px', mb: 1 }}>
        <ListItemIcon>
          <CreditCardIcon />
        </ListItemIcon>
        <ListItemText primary="Upload file" />
        <input type="file" hidden />
      </ListItemButton>
      <ListItemButton sx={{ background: '#ebebeb', borderRadius: '5px', mb: 1 }}>
        <ListItemIcon>
          <AttachFileIcon />
        </ListItemIcon>
        <ListItemText primary="Attachment" />
        <input type="file" hidden />
      </ListItemButton>
      <ListItemButton sx={{ background: '#ebebeb', borderRadius: '5px', mb: 1 }}>
        <ListItemIcon>
          <BookmarkBorderIcon />
        </ListItemIcon>
        <ListItemText primary="Labels" />
      </ListItemButton>
      <ListItemButton sx={{ background: '#ebebeb', borderRadius: '5px', mb: 1 }}>
        <ListItemIcon>
          <CheckCircleOutlineIcon />
        </ListItemIcon>
        <ListItemText primary="Checklist" />
      </ListItemButton>
      <ListItemButton sx={{ background: '#ebebeb', borderRadius: '5px', mb: 1 }}>
        <ListItemIcon>
          <CalendarMonthIcon />
        </ListItemIcon>
        <ListItemText primary="Dates" />
      </ListItemButton>
      <ListItemButton sx={{ background: '#ebebeb', borderRadius: '5px', mb: 1 }}>
        <ListItemIcon>
          <AutoFixHighIcon />
        </ListItemIcon>
        <ListItemText primary="Custom Fields" />
      </ListItemButton>
    </List>
  )
}
