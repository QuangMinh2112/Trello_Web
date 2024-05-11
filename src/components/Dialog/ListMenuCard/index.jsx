import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
import { updateCardDetail } from '~/apis'
import { toast } from 'react-toastify'

export default function ActionListCard({ onChangeAvatar, cardId, editCardDetails }) {
  const handleCoverChange = async (e) => {
    let toastId = null
    try {
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append('cover', file)

      toastId = toast.loading('Uploading...', { position: 'bottom-left', autoClose: false })
      const res = await updateCardDetail(cardId, formData)

      if (res.success) {
        onChangeAvatar(res?.updatedCard.cover)
        editCardDetails(cardId, res?.updatedCard.cover, 4)
        toast.dismiss(toastId)
      }
    } catch (error) {
      console.error('Edit card cover failed:', error)
    }
  }

  return (
    <List sx={{ width: '100%', maxWidth: 360 }} component="nav" aria-labelledby="nested-list-subheader">
      <ListItemButton sx={{ borderRadius: '5px', mb: 1 }} variant="contained" component="label">
        <ListItemIcon>
          <AddPhotoAlternateIcon />
        </ListItemIcon>
        <ListItemText primary="Cover" />
        <input type="file" hidden onChange={handleCoverChange} />
      </ListItemButton>
      <ListItemButton sx={{ borderRadius: '5px', mb: 1 }}>
        <ListItemIcon>
          <AttachFileIcon />
        </ListItemIcon>
        <ListItemText primary="Attachment" />
        <input type="file" hidden />
      </ListItemButton>
      <ListItemButton sx={{ borderRadius: '5px', mb: 1 }}>
        <ListItemIcon>
          <BookmarkBorderIcon />
        </ListItemIcon>
        <ListItemText primary="Labels" />
      </ListItemButton>
      <ListItemButton sx={{ borderRadius: '5px', mb: 1 }}>
        <ListItemIcon>
          <CheckCircleOutlineIcon />
        </ListItemIcon>
        <ListItemText primary="Checklist" />
      </ListItemButton>
      <ListItemButton sx={{ borderRadius: '5px', mb: 1 }}>
        <ListItemIcon>
          <CalendarMonthIcon />
        </ListItemIcon>
        <ListItemText primary="Dates" />
      </ListItemButton>
      <ListItemButton sx={{ borderRadius: '5px', mb: 1 }}>
        <ListItemIcon>
          <AutoFixHighIcon />
        </ListItemIcon>
        <ListItemText primary="Custom Fields" />
      </ListItemButton>
    </List>
  )
}
