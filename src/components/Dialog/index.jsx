import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import DialogTitle from '@mui/material/DialogTitle'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import PublicIcon from '@mui/icons-material/Public'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useSelector, useDispatch } from 'react-redux'
import { createNewBoard } from '~/apis'
import { authSelector } from '~/redux/auth/auth.selector'
import { getCurrentUser } from '~/redux/auth/auth.action'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import { BoardSchema } from '~/utils/validation'

export default function DialogCreateNewBoard({ isShowDialog, setIsShowDialog, currentUser }) {
  const { userInfo } = useSelector(authSelector)
  const [type, setType] = React.useState('public')
  const dispatch = useDispatch()

  const handleClose = () => {
    setIsShowDialog(false)
  }

  // validation
  const formik = useFormik({
    initialValues: {
      title: '',
      description: ''
    },
    validationSchema: BoardSchema,
    onSubmit: async (values) => {
      const payload = {
        type,
        createdBy: currentUser._id,
        ...values
      }
      await createNewBoard(payload)
      dispatch(getCurrentUser(userInfo?._id))
      handleClose()
      toast.success('Created new board successfully!')
    }
  })
  return (
    <React.Fragment>
      <Dialog
        open={isShowDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form action="" onSubmit={formik.handleSubmit}>
          <DialogTitle id="alert-dialog-title" sx={{ textAlign: 'center' }}>
            {'CREATE BOARD'}
          </DialogTitle>
          <DialogContent>
            {' '}
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '330px', gap: '5px', paddingBottom: 1 }}>
              {' '}
              <label htmlFor="">Title board</label>
              <TextField
                id="title"
                name="title"
                variant="outlined"
                sx={{
                  '& .MuiInputBase-input': {
                    padding: '10px 15px'
                  },
                  '& .MuiFormHelperText-root': {
                    marginLeft: 0
                  }
                }}
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '330px', gap: '5px', paddingBottom: 1 }}>
              {' '}
              <label htmlFor="">Description</label>
              <TextField
                sx={{
                  '& .MuiFormHelperText-root': {
                    marginLeft: 0
                  }
                }}
                id="description"
                variant="outlined"
                name="description"
                multiline
                minRows={3}
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {' '}
              <label htmlFor="">Status</label>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="type"
                  value={type}
                  defaultValue="public"
                  onChange={(e) => setType(e.target.value)}
                  sx={{
                    '& .MuiSelect-outlined': {
                      display: 'flex',
                      gap: 1,
                      alignItems: 'center',
                      padding: '10px 10px'
                    }
                  }}
                >
                  <MenuItem value="public" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <PublicIcon sx={{ fontSize: '14px' }} />
                    Public
                  </MenuItem>
                  <MenuItem value="private" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {' '}
                    <LockOutlinedIcon sx={{ fontSize: '14px' }} />
                    Private
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="outlined">
              Create
            </Button>
            <Button onClick={handleClose} variant="outlined">
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  )
}
