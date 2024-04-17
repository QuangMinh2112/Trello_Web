import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import { NavLink } from 'react-router-dom'
import { capitalizedFirstLetter } from '~/utils/constanst'
import { useState } from 'react'
import DialogCreateNewBoard from '~/components/Dialog'

const TEXT_COLOR = (theme) => (theme.palette.mode === 'dark' ? '#B6C2CF' : 'white')

const Content = ({ currentUser }) => {
  const [isShowDialog, setIsShowDialog] = useState(false)

  const handleCreateNewBoard = () => {
    setIsShowDialog(true)
  }

  return (
    <Box sx={{ maxWidth: '825px', minWidth: '825px' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          borderBottom: (theme) => `1px solid ${theme.palette.mode === 'dark' ? '#3f3f3f' : '#fff'}`,
          paddingBottom: '10px'
        }}
      >
        <Box
          sx={{
            width: '64px',
            height: '64px',
            background: 'linear-gradient(#9F8FEF, #403294, #579DFF, #0747a6)',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box
            component="span"
            sx={{
              fontSize: '35px',
              fontWeight: 'bold',
              color: TEXT_COLOR
            }}
          >
            T
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {' '}
          <Box component="span" sx={{ color: TEXT_COLOR }}>
            Trello Không gian làm việc
          </Box>
          <Box sx={{ fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <LockOutlinedIcon sx={{ fontSize: '14px', color: TEXT_COLOR }} />
            <Box
              component="span"
              sx={{
                fontSize: '14px',
                color: TEXT_COLOR,
                paddingTop: '3px'
              }}
            >
              Riêng tư
            </Box>
          </Box>
        </Box>
      </Box>

      {/* display board */}
      <Box sx={{ marginTop: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 2 }}>
          <PersonOutlineOutlinedIcon sx={{ color: TEXT_COLOR }} />
          <Typography sx={{ color: TEXT_COLOR, paddingTop: '5px' }}>All board</Typography>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex' }}>
            {currentUser?.boardIds?.map((board) => (
              <NavLink key={board._id} to={`/board/${board._id}`}>
                <Box
                  sx={{
                    width: '190px',
                    padding: '8px',
                    height: '92px',
                    borderRadius: '3px',
                    marginRight: 1,
                    marginTop: 1,
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    color: '#fff',
                    backgroundColor: '#A6C5E229'
                  }}
                >
                  {capitalizedFirstLetter(board?.title)}
                </Box>
              </NavLink>
            ))}
          </Box>
          {isShowDialog && (
            <DialogCreateNewBoard
              isShowDialog={isShowDialog}
              setIsShowDialog={setIsShowDialog}
              currentUser={currentUser}
            />
          )}
          <Box
            sx={{
              width: '190px',
              height: '92px',
              borderRadius: '3px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: TEXT_COLOR,
              marginTop: 1,
              backgroundColor: '#A6C5E229',
              cursor: 'pointer',
              fontSize: '14px',
              '&:hover': {
                backgroundColor: '#ffffff29'
              }
            }}
            onClick={handleCreateNewBoard}
          >
            Create new board
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Content
