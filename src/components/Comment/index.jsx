import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

const Comment = ({ value, createdAt, nameUser }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, padding: '10px 0' }}>
      <Tooltip title="quangminh">
        <Avatar
          alt="Remy Sharp"
          src="https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-6/334494904_909968490428262_1880365116923209069_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=GxuY1GgGvXgAX9wppBp&_nc_ht=scontent.fdad3-4.fna&oh=00_AfBVgX3sElX8bCk6maZXyWFNvylZONsVleLFPr-dDNwW8g&oe=64B326FA"
        />
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
            {createdAt}
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
