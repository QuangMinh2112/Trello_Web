import { useEffect, useRef, useState } from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import Tooltip from '@mui/material/Tooltip'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import AddCardIcon from '@mui/icons-material/AddCard'
import Button from '@mui/material/Button'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import ListCards from './ListCards/ListCards'
import CloseIcon from '@mui/icons-material/Close'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { toast } from 'react-toastify'
import { useConfirm } from 'material-ui-confirm'
import { updateColumnTitleAPI } from '~/apis'

function Column({ column, createdNewCard, deleteColumn, editCardDetails }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: column._id,
    data: { ...column }
  })
  const dntKitStyle = {
    transform: CSS.Translate.toString(transform),
    transition,
    height: '100%',
    border: 'none',
    outline: 'none',
    opacity: isDragging ? 0.5 : ''
  }

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const confirm = useConfirm()

  const [openNewCardForm, setOpenNewCardForm] = useState(false)
  const [editColumn, setEditColumn] = useState(false)
  const [editedTitle, setEditedTitle] = useState('')
  const [titleCard, setTitleCard] = useState('')
  const columnTitleRef = useRef()
  const titleCardRef = useRef()
  const toggleOpenNewCardForm = () => setOpenNewCardForm(!openNewCardForm)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleAddNewCard = async () => {
    if (titleCard.length < 3 || titleCard.length > 50) {
      toast.error('Title card must be between 3 and 50 characters long!', { position: 'bottom-left' })
    } else {
      const newCardData = {
        title: titleCard,
        columnId: column._id
      }
      await createdNewCard(newCardData)
      toast.success('Created card success !', { position: 'bottom-left' })
      toggleOpenNewCardForm()
      setTitleCard('')
    }
  }

  const handleRemoveColumn = () => {
    confirm({
      title: 'Remove column ?',
      description: 'This action will permanently delete your column and its Cards! Are you sure?',
      cancellationText: 'Cancel',
      confirmationText: 'Confirm'
    })
      .then(() => {
        deleteColumn(column._id)
      })
      .catch(() => {})
  }

  useEffect(() => {
    if (editColumn && columnTitleRef.current) {
      columnTitleRef.current.focus()
    }
  }, [editColumn])

  useEffect(() => {
    if (openNewCardForm) {
      titleCardRef.current.focus()
    }
  }, [openNewCardForm])

  useEffect(() => {
    setEditedTitle(column?.title)
  }, [column?.title])

  const handleEditColumnTitleWhenBlur = async (columnId) => {
    if (editColumn && column?.title !== editedTitle) {
      const payload = {
        title: editedTitle
      }
      const res = await updateColumnTitleAPI(columnId, payload)
      if (res.success) {
        setEditColumn(false)
        setEditedTitle(editedTitle)
        toast.success('Edit column title successfully!')
      }
    } else {
      setEditColumn(false)
    }
  }

  const orderedCards = column?.cards
  return (
    <div ref={setNodeRef} style={dntKitStyle} {...attributes}>
      <Box
        {...listeners}
        sx={{
          minWidth: '300px',
          maxWidth: '300px',
          backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'),
          ml: 2,
          borderRadius: '5px',
          outline: 'none',
          height: 'fit-content',
          cursor: 'pointer',
          maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
        }}
      >
        {/* Box Header */}
        <Box
          sx={{
            height: (theme) => theme.trello.columnHeaderHeight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2
          }}
        >
          {editColumn ? (
            <TextField
              inputRef={(input) => (columnTitleRef.current = input)}
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              data-no-dnd="true"
              sx={{
                width: '100%',
                fontWeight: 'bold',
                fontSize: '2rem',
                cursor: 'pointer',
                '& .MuiInputBase-input': {
                  padding: '0'
                },
                '& fieldset': { border: 'none' }
              }}
              inputProps={{ style: { fontSize: '1rem', fontWeight: 'bold' } }}
              onBlur={() => handleEditColumnTitleWhenBlur(column._id)}
            />
          ) : (
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              {editedTitle}
            </Typography>
          )}

          <Box>
            <Tooltip title="More options">
              <KeyboardArrowDownIcon
                sx={{
                  color: 'text.primary',
                  cursor: 'pointer'
                }}
                id="basic-menu-column-dropdown"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              />
            </Tooltip>
            <Menu
              id="basic-menu-column-dropdown"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button'
              }}
            >
              <MenuItem
                sx={{
                  '&:hover': {
                    color: 'success.light',
                    '& .add-new-card-icon': {
                      color: 'success.light'
                    }
                  }
                }}
                onClick={toggleOpenNewCardForm}
              >
                <ListItemIcon>
                  <AddCardIcon className="add-new-card-icon" fontSize="small" />
                </ListItemIcon>
                <ListItemText>Add new card</ListItemText>
              </MenuItem>

              <MenuItem
                onClick={() => {
                  setEditColumn(true)
                }}
                sx={{
                  '&:hover': {
                    color: 'success.light',
                    '& .add-new-card-icon': {
                      color: 'success.light'
                    }
                  }
                }}
              >
                <ListItemIcon>
                  <BorderColorIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Edit</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={handleRemoveColumn}
                sx={{
                  '&:hover': {
                    color: 'warning.dark',
                    '& .delete-icon': {
                      color: 'warning.dark'
                    }
                  }
                }}
              >
                <ListItemIcon>
                  <DeleteForeverIcon className="delete-icon" fontSize="small" />
                </ListItemIcon>
                <ListItemText>Remove this column</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
        {/* Box List Card */}
        <ListCards cards={orderedCards} editCardDetails={editCardDetails} />
        {/* Box Footer */}
        <Box
          sx={{
            height: (theme) => theme.trello.columnFooterHeight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2
          }}
        >
          {!openNewCardForm ? (
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Button startIcon={<AddCardIcon />} onClick={toggleOpenNewCardForm}>
                Add new card
              </Button>
              <Tooltip title="Drawer to move">
                <DragHandleIcon sx={{ cursor: 'pointer' }} />
              </Tooltip>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                label="Enter card title"
                type="text"
                size="small"
                variant="outlined"
                data-no-dnd="true"
                value={titleCard}
                onChange={(e) => setTitleCard(e.target.value)}
                inputRef={(input) => (titleCardRef.current = input)}
                autoFocus
                sx={{
                  minWidth: '120px',
                  '& label': { color: (theme) => (theme.palette.mode === 'dark' ? 'white' : 'black') },
                  '& label.Mui-focused': { color: (theme) => (theme.palette.mode === 'dark' ? 'white' : 'black') },
                  '& input': { color: (theme) => (theme.palette.mode === 'dark' ? 'white' : 'black') },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: (theme) => (theme.palette.mode === 'dark' ? 'white' : 'black') },
                    '&:hover fieldset': { borderColor: (theme) => (theme.palette.mode === 'dark' ? 'white' : 'black') },
                    '&.Mui-focused fieldset': {
                      borderColor: (theme) => (theme.palette.mode === 'dark' ? 'white' : 'black')
                    }
                  }
                }}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Button
                  data-no-dnd="true"
                  onClick={handleAddNewCard}
                  sx={{
                    boxShadow: 'none',
                    background: (theme) =>
                      theme.palette.mode === 'dark' ? 'var(--ds-background-brand-bold, #0c66e4)' : 'green',
                    color: 'white',
                    '&:hover': {
                      background: 'var(--ds-background-brand-bold-hovered, #0055cc)'
                    }
                  }}
                >
                  Add
                </Button>
                <Button
                  sx={{
                    minWidth: '32px',
                    height: '100%'
                  }}
                  onClick={toggleOpenNewCardForm}
                >
                  <CloseIcon
                    fontSize="small"
                    sx={{ color: (theme) => (theme.palette.mode === 'dark' ? 'white' : 'black'), cursor: 'pointer' }}
                  />
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </div>
  )
}

export default Column
