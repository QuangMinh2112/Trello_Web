import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import SubjectIcon from '@mui/icons-material/Subject'
import DialogTitle from '@mui/material/DialogTitle'
import Box from '@mui/material/Box'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import Typography from '@mui/material/Typography'
import EditNoteIcon from '@mui/icons-material/EditNote'
import SaveIcon from '@mui/icons-material/Save'
import CloseIcon from '@mui/icons-material/Close'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import AvatarGroup from '@mui/material/AvatarGroup'
import CommentIcon from '@mui/icons-material/Comment'
import TextField from '@mui/material/TextField'
import MarkdownEditor from '../MarkdownEditor'
import ActionListCard from './ListMenuCard'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import PowerUps from './Power-Ups'
import Actions from './Actions'
import Comment from '../Comment'
import { useSelector } from 'react-redux'
import { authSelector } from '~/redux/auth/auth.selector'

const CardDialog = ({ isShowDialog, onIsShowDialog, card, editCardDetails }) => {
  const [editMarkdown, setEditMarkdown] = React.useState(false)
  const [editCardTitle, setEditCardTitle] = React.useState(false)
  const [editedCardTitle, setEditedCardTitle] = React.useState('')
  const [avatar, setAvatar] = React.useState(null)
  const { userInfo } = useSelector(authSelector)
  const [comment, setComment] = React.useState('')
  const cardTitleRef = React.useRef()
  const handleClose = () => {
    onIsShowDialog(false)
  }

  const handleEditTitleCard = () => {
    setEditCardTitle(true)
  }

  const handleEditCardTitleWhenBlur = async (cardId) => {
    if (editCardTitle) {
      editCardDetails(cardId, editedCardTitle, 0)
    }

    setEditCardTitle(false)
  }

  React.useEffect(() => {
    if (editCardTitle && cardTitleRef.current) {
      cardTitleRef.current.focus()
    }
  }, [editCardTitle])

  React.useEffect(() => {
    setEditedCardTitle(card?.title)
  }, [card?.title])

  const handleSubmitComment = (e) => {
    e.preventDefault()
    if (comment) {
      editCardDetails(card._id, comment, 1)
    }
    setComment('')
  }
  const handleChangeDescription = () => {
    setEditMarkdown(!editMarkdown)
  }

  return (
    <React.Fragment>
      <Dialog
        open={isShowDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth="md"
        data-no-dnd="true"
      >
        <Box sx={{ textAlign: 'end', padding: '5px 5px 0 0' }}>
          <IconButton
            sx={{
              borderRadius: '50%',
              background: 'red',
              '&.MuiIconButton-root': {
                padding: '2px'
              },
              color: 'white'
            }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        {card?.cover && (
          <Box sx={{ width: '100%', height: 300, padding: 1 }}>
            <Box
              component="img"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 1
              }}
              alt="The house from the offer."
              src={avatar ? avatar : card?.cover}
            />
          </Box>
        )}
        <DialogTitle
          id="alert-dialog-title"
          sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '70%' }}
          onClick={handleEditTitleCard}
        >
          <CreditCardIcon />
          {editCardTitle ? (
            <TextField
              data-no-dnd="true"
              inputRef={(input) => (cardTitleRef.current = input)}
              value={editedCardTitle}
              onChange={(e) => setEditedCardTitle(e.target.value)}
              sx={{
                width: '100%',
                fontWeight: 'bold',
                fontSize: '2rem',
                cursor: 'pointer',
                '& .MuiInputBase-input': {
                  padding: '5px'
                }
              }}
              onBlur={() => handleEditCardTitleWhenBlur(card._id)}
              inputProps={{ style: { fontSize: '1rem', fontWeight: 'bold' } }}
            />
          ) : (
            <Typography
              variant="span"
              sx={{
                fontWeight: 'bold',
                fontSize: '1rem'
              }}
            >
              {editedCardTitle}
            </Typography>
          )}
        </DialogTitle>

        <DialogContent sx={{ display: 'flex', width: '100%' }}>
          {/* left */}
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '70%' }}>
            <Box sx={{ padding: '16px 0px' }}>
              <Typography sx={{ color: '#06a0ff', fontWeight: '600', marginBottom: '5px' }}>Member</Typography>
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
                  },
                  display: 'flex',
                  justifyContent: 'flex-end'
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
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {/* Description Title */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <SubjectIcon />
                  <Typography variant="h6" sx={{ fontWeight: '800' }}>
                    Description
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  sx={{ color: '#ffff', backgroundColor: '#178be8' }}
                  startIcon={editMarkdown ? <SaveIcon /> : <EditNoteIcon />}
                  onClick={handleChangeDescription}
                >
                  {editMarkdown ? 'Save' : 'Edit'}
                </Button>
              </Box>

              {/* MarkdownEditor */}
              <Box>
                <MarkdownEditor
                  editMarkdown={editMarkdown}
                  cardId={card._id}
                  description={card.description}
                  editCardDetails={editCardDetails}
                />
              </Box>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CommentIcon />
                  <Typography variant="h6" sx={{ fontWeight: '800' }}>
                    Activity
                  </Typography>
                </Box>
                {/* Commemt */}
                <form onSubmit={handleSubmitComment}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, padding: '10px 0' }}>
                    <Tooltip title="quangminh">
                      <Avatar alt="Avatar user" src={userInfo?.avatar} />
                    </Tooltip>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      fullWidth={true}
                      placeholder="Write a comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      sx={{
                        '& .MuiOutlinedInput-input': {
                          padding: '9.5px 14px;'
                        }
                      }}
                    />
                  </Box>
                </form>
                {/* Render list comment */}
                {card?.comments?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) &&
                  card?.comments?.map((c, index) => (
                    <React.Fragment key={index}>
                      <Comment
                        value={c?.content}
                        createdAt={c?.createdAt}
                        nameUser={c?.userDisplayname}
                        avatar={c?.userAvatar}
                      />
                    </React.Fragment>
                  ))}
              </Box>
            </Box>
          </Box>
          {/* right */}
          <Box sx={{ padding: '16px 0 16px 15px', width: '30%' }}>
            <Typography sx={{ color: '#06a0ff', fontWeight: '600', marginBottom: '5px' }}>Add to card</Typography>
            <ActionListCard onChangeAvatar={setAvatar} cardId={card._id} editCardDetails={editCardDetails} />
            <Divider />
            <Typography sx={{ color: '#06a0ff', fontWeight: '600', marginBottom: '5px', paddingTop: 1 }}>
              Power-Ups
            </Typography>
            <PowerUps />
            <Divider />
            <Typography sx={{ color: '#06a0ff', fontWeight: '600', marginBottom: '5px', paddingTop: 1 }}>
              Actions
            </Typography>
            <Actions />
          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}

export default CardDialog
