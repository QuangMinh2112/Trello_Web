import Box from '@mui/material/Box'
import Column from './Column/Column'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import CloseIcon from '@mui/icons-material/Close'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCreateNewColumnApi } from '~/redux/board/board.action'

function ListColumns({ columns, createdNewCard, createdNewColumn, deleteColumn, editCardDetails }) {
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const [titleColumn, setTitleColumn] = useState('')
  const board = useSelector((state) => state.board.boards)
  const dispatch = useDispatch()
  const toggleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)

  const handleAddNewColumn = async () => {
    if (!titleColumn) {
      // handle error when title is empty
      toast.error('Please enter title column !', { position: 'bottom-right' })
      return
    } else {
      const newColumnData = {
        title: titleColumn
      }
      // dispatch(fetchCreateNewColumnApi({ title: newColumnData.title, boardId: board._id }))
      await createdNewColumn(newColumnData)

      toast.success('Craete column success !', { position: 'bottom-right' })
      toggleOpenNewColumnForm()
      setTitleColumn('')
    }
    // call api here
  }

  return (
    <SortableContext items={columns?.map((c) => c._id)} strategy={horizontalListSortingStrategy}>
      <Box
        sx={{
          bgcolor: 'inherit',
          width: '100%',
          height: '100%',
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'hidden',
          '&::-webkit-scrollbar-track': { m: 2 }
        }}
      >
        {columns?.map((column) => (
          <Column
            key={column._id}
            column={column}
            createdNewCard={createdNewCard}
            deleteColumn={deleteColumn}
            editCardDetails={editCardDetails}
          />
        ))}

        {/* add columns button */}
        {!openNewColumnForm ? (
          <Box
            sx={{
              minWidth: '250px',
              maxWidth: '250px',
              mx: 2,
              borderRadius: '6px',
              bgcolor: '#ffffff3d',
              height: 'fit-content'
            }}
          >
            <Button
              sx={{
                color: 'white',
                width: '100%',
                justifyContent: 'flex-start',
                pl: 2.5,
                py: 1
              }}
              startIcon={<NoteAddIcon />}
              onClick={toggleOpenNewColumnForm}
            >
              Add new column
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              minWidth: '250px',
              maxWidth: '250px',
              mx: 2,
              p: 1,
              borderRadius: '6px',
              bgcolor: '#ffffff3d',
              height: 'fit-content',
              display: 'flex',
              flexDirection: 'column',
              gap: 1
            }}
          >
            <TextField
              label="Enter column title..."
              type="text"
              size="small"
              variant="outlined"
              value={titleColumn}
              onChange={(e) => setTitleColumn(e.target.value)}
              autoFocus
              sx={{
                minWidth: '120px',
                '& label': { color: 'white' },
                '& label.Mui-focused': { color: 'white' },
                '& input': { color: 'white' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'white' },
                  '&:hover fieldset': { borderColor: 'white' },
                  '&.Mui-focused fieldset': { borderColor: 'white' }
                }
              }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button
                sx={{
                  boxShadow: 'none',
                  background: (theme) =>
                    theme.palette.mode === 'dark' ? 'var(--ds-background-brand-bold, #0c66e4)' : 'green',
                  color: 'white',
                  '&:hover': {
                    background: 'var(--ds-background-brand-bold-hovered, #0055cc)'
                  }
                }}
                onClick={handleAddNewColumn}
              >
                Add Columns
              </Button>
              <Button
                sx={{
                  minWidth: '32px',
                  height: '100%'
                }}
                onClick={toggleOpenNewColumnForm}
              >
                <CloseIcon fontSize="small" sx={{ color: 'white', cursor: 'pointer' }} />
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </SortableContext>
  )
}

export default ListColumns
