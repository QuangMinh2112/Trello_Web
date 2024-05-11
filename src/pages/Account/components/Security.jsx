import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import PasswordIcon from '@mui/icons-material/Password'
import LockResetIcon from '@mui/icons-material/LockReset'
import LockIcon from '@mui/icons-material/Lock'
import { useFormik } from 'formik'
import { authResetPasswordSchema } from '~/Schemas/authSchema'
import { apiResetPassword } from '~/apis/auth'
import { toast } from 'react-toastify'
import { useConfirm } from 'material-ui-confirm'
import { useDispatch } from 'react-redux'
import { logout } from '~/redux/auth/auth.slice'
const Security = () => {
  const confirm = useConfirm()
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    validationSchema: authResetPasswordSchema,
    onSubmit: async (values) => {
      const res = await apiResetPassword(values)

      if (res.message === 'Password reset successful') {
        confirm({
          title: 'Change Password ?',
          description: 'You have to login again after successfully changing your password. Countinue?',
          cancellationText: 'Cancel',
          confirmationText: 'Confirm'
        }).then(() => {
          dispatch(logout())
          toast.success('Password reset successfully !')
        })
      } else {
        toast.error(res.message)
      }
    }
  })

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
        width: '400px'
      }}
    >
      <Typography variant="h5">Security Dashboard</Typography>
      <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
          <TextField
            id="currentPassword"
            label="Current password"
            type="password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PasswordIcon />
                </InputAdornment>
              )
            }}
            sx={{
              '& .MuiFormHelperText-root': {
                marginLeft: 0
              }
            }}
            value={formik.values.currentPassword}
            onChange={formik.handleChange}
            error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
            helperText={formik.touched.currentPassword && formik.errors.currentPassword}
          />
          <TextField
            id="newPassword"
            label="New Password"
            type="password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              )
            }}
            sx={{
              '& .MuiFormHelperText-root': {
                marginLeft: 0
              }
            }}
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
            helperText={formik.touched.newPassword && formik.errors.newPassword}
          />
          <TextField
            id="confirmPassword"
            label="New Password Comfirmation"
            type="password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockResetIcon />
                </InputAdornment>
              )
            }}
            sx={{
              '& .MuiFormHelperText-root': {
                marginLeft: 0
              }
            }}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          />
          <Button type="submit" variant="contained" tabIndex={-1} sx={{ backgroundColor: '#0683ff', color: 'white' }}>
            Change
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default Security
