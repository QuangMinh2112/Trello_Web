import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import moment from 'moment'

const Comment = ({ value, createdAt, nameUser, avatar }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, padding: '10px 0' }}>
      <Tooltip title="quangminh">
        <Avatar alt="Remy Sharp" src={avatar} sx={{ marginTop: '20px' }} />
      </Tooltip>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="h6" sx={{ fontSize: '15px' }}>
            {nameUser}
          </Typography>
          <Typography
            variant="span"
            sx={{
              fontSize: '12px'
            }}
          >
            {moment(createdAt).format('ddd, MMM D, YYYY HH:mm')}
          </Typography>
        </Box>
        <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth={true}
          value={value}
          disabled
          sx={{
            '& .MuiOutlinedInput-input': {
              padding: '9.5px 14px;'
            }
          }}
        />
      </Box>
    </Box>
  )
}

export default Comment
