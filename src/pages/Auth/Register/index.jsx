import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined'
import SvgIcon from '@mui/material/SvgIcon'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import { useState } from 'react'
import withBaseLogic from '~/hoc'
import { apiRegisterUser } from '~/apis/auth'
import bg from '~/assets/bg.jpg'
import { useFormik } from 'formik'
import { authRegisterSchema } from '~/Schemas/authSchema'
import { NavLink } from 'react-router-dom'
// eslint-disable-next-line react-refresh/only-export-components
const Register = ({ navigate }) => {
  const [errorMessage, setErrorMessage] = useState('')

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    },
    validationSchema: authRegisterSchema,
    onSubmit: async (values) => {
      const response = await apiRegisterUser(values)
      if (response.message === 'Register successful!') {
        navigate('/login')
      } else {
        setErrorMessage(response.message)
      }
    }
  })

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundImage: `url(${bg})`
      }}
    >
      <Box
        sx={{
          width: '400px',
          padding: '32px 24px 24px',
          borderRadius: '6px',
          background: '#fff',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          color: (theme) => (theme.palette.mode === 'dark' ? 'black' : '#fff')
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '45px',
              height: '45px',
              borderRadius: '50%',
              background: '#1976d2'
            }}
          >
            <LockOpenOutlinedIcon sx={{ color: 'white' }} />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '45px',
              height: '45px',
              borderRadius: '50%',
              background: '#1976d2'
            }}
          >
            <SvgIcon component={TrelloIcon} fontSize="small" inheritViewBox sx={{ color: 'white' }} />
          </Box>
        </Box>
        <Box
          sx={{
            textAlign: 'center',
            color: 'black'
          }}
        >
          Author: QuangMinhDev
        </Box>

        {/* Show alert error */}
        {errorMessage && (
          <Alert variant="filled" severity="error" sx={{ color: '#fff' }}>
            {errorMessage}
          </Alert>
        )}

        <form onSubmit={formik.handleSubmit}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2
            }}
          >
            <TextField
              id="firstName"
              variant="outlined"
              label="First Name"
              placeholder="Enter your first name"
              sx={{
                width: '100%',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#ccc'
                  },
                  '&:hover fieldset': {
                    borderColor: '#ccc'
                  }
                },
                '& .MuiFormHelperText-root': {
                  marginLeft: 0
                },
                '& .MuiOutlinedInput-input': {
                  color: 'black'
                }
              }}
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
              id="lastName"
              variant="outlined"
              label="Last Name"
              placeholder="Enter your last name"
              sx={{
                width: '100%',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#ccc'
                  },
                  '&:hover fieldset': {
                    borderColor: '#ccc'
                  }
                },
                '& .MuiFormHelperText-root': {
                  marginLeft: 0
                },
                '& .MuiOutlinedInput-input': {
                  color: 'black'
                }
              }}
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
            <TextField
              id="email"
              variant="outlined"
              label="Email"
              placeholder="Enter your email"
              sx={{
                width: '100%',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#ccc'
                  },
                  '&:hover fieldset': {
                    borderColor: '#ccc'
                  }
                },
                '& .MuiFormHelperText-root': {
                  marginLeft: 0
                },
                '& .MuiOutlinedInput-input': {
                  color: 'black'
                }
              }}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              id="password"
              variant="outlined"
              label="Password"
              placeholder="Enter your password"
              type="password"
              sx={{
                width: '100%',
                color: 'black',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#ccc'
                  },
                  '&:hover fieldset': {
                    borderColor: '#ccc'
                  }
                },
                '& .MuiOutlinedInput-input': {
                  color: 'black'
                },
                '& .MuiFormHelperText-root': {
                  marginLeft: 0
                }
              }}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button
              variant="contained"
              sx={{ color: '#fff', background: '#1976d2', padding: '10px 16px' }}
              type="submit"
            >
              Register
            </Button>
          </Box>
        </form>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
          <Box component="span" sx={{ color: 'black' }}>
            Already have an account.?
          </Box>
          <NavLink to="/login" style={{ color: 'red' }}>
            Login Now!
          </NavLink>
        </Box>
      </Box>
    </Box>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export default withBaseLogic(Register)
