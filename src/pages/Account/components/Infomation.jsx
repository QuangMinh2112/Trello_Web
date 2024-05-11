import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { styled } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import EmailIcon from '@mui/icons-material/Email'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authSelector } from '~/redux/auth/auth.selector'
import { toast } from 'react-toastify'
import { updateAvatar, updateInfo } from '~/redux/auth/auth.action'
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
})
const Infomation = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const { userInfo } = useSelector(authSelector)
  const dispatch = useDispatch()
  const handleFileChange = async (event) => {
    let toastId = null
    try {
      const file = event.target.files[0]
      const formData = new FormData()
      formData.append('avatar', file)
      toastId = toast.loading('Uploading...', { position: 'bottom-left', autoClose: false })
      const res = await dispatch(updateAvatar({ userId: userInfo._id, formData }))
      if (res.payload && res.payload.success) {
        toast.dismiss(toastId)
        setSelectedFile(res.payload.updatedUser.avatar)
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  const handleSubmitChangeAccount = async (event) => {
    event.preventDefault()
    const data = { firstName, lastName }
    const res = await dispatch(updateInfo({ userId: userInfo._id, data }))
    if (res.payload) {
      toast.success('Update info successfully!')
    }
  }

  useEffect(() => {
    if ((userInfo && userInfo.firstName) || userInfo.lastName) {
      setFirstName(userInfo.firstName)
      setLastName(userInfo.lastName)
    }
  }, [userInfo])

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
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center' }}>
          <Avatar
            alt="Remy Sharp"
            src={selectedFile || userInfo?.avatar}
            sx={{ width: 96, height: 96, textAlign: 'center' }}
          />

          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon sx={{ color: 'white' }} />}
            sx={{ backgroundColor: '#0683ff', color: 'white' }}
          >
            Upload
            <VisuallyHiddenInput type="file" onChange={handleFileChange} />
          </Button>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="body1">{`${userInfo?.firstName}  ${userInfo?.lastName}`}</Typography>
          <Typography variant="body1" sx={{ pb: 4, fontWeight: 'bold' }}>
            {userInfo?.email}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
        <TextField
          disabled
          id="input-with-icon-textfield"
          label="Your Email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            )
          }}
          variant="filled"
          defaultValue={userInfo?.email}
        />
        <TextField
          disabled
          id="input-with-icon-textfield"
          label="Your Full Name"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountBoxIcon />
              </InputAdornment>
            )
          }}
          variant="filled"
          defaultValue={`${userInfo?.firstName} ${userInfo?.lastName}`}
        />
        <form onSubmit={handleSubmitChangeAccount}>
          <TextField
            id="input-with-icon-textfield"
            label="Your Firt Name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ManageAccountsIcon />
                </InputAdornment>
              )
            }}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            sx={{ width: '100%', marginBottom: 2 }}
          />
          <TextField
            id="input-with-icon-textfield"
            label="Your Last Name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ManageAccountsIcon />
                </InputAdornment>
              )
            }}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            sx={{ width: '100%', marginBottom: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            tabIndex={-1}
            sx={{ backgroundColor: '#0683ff', color: 'white', width: '100%' }}
          >
            Update
          </Button>
        </form>
      </Box>
    </Box>
  )
}

export default Infomation
