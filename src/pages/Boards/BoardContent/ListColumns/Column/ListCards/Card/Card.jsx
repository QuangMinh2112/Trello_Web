import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

function Card({ card }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card._id,
    data: { ...card }
  })

  const dntKitCardStyle = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : '',
    border: isDragging ? '#3498db 1px solid' : ''
  }

  const hideCardActions = () => {
    return !!card?.memberIds?.length || !!card?.coments?.length || !!card?.attachments?.length
  }

  return (
    <MuiCard
      ref={setNodeRef}
      style={dntKitCardStyle}
      {...attributes}
      {...listeners}
      sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        overflow: 'unset'
      }}
    >
      {card?.cover && <CardMedia sx={{ height: 140 }} image={card?.cover} title="green iguana" />}
      <CardContent
        sx={{
          p: 1.5,
          '&:last-child': { p: 1.5 },
          overflow: 'unset'
        }}
      >
        <Typography>{card?.title} </Typography>
      </CardContent>
      {hideCardActions() && (
        <CardActions sx={{ p: '0 4px 8px 4px' }}>
          {!!card?.memberIds?.length && (
            <Button startIcon={<GroupIcon />} size="small">
              {card?.memberIds?.length}
            </Button>
          )}
          {!!card?.coments?.length && (
            <Button startIcon={<CommentIcon />} size="small">
              {card?.coments?.length}
            </Button>
          )}
          {!!card?.attachments?.length && (
            <Button startIcon={<AttachmentIcon />} size="small">
              {card?.attachments?.length}
            </Button>
          )}
        </CardActions>
      )}
    </MuiCard>
  )
}

export default Card
