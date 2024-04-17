import Box from '@mui/material/Box'

const Sidebar = () => {
  return (
    <Box sx={{ width: '256px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box
          sx={{
            width: '24px',
            height: '24px',
            background: 'linear-gradient(#9F8FEF, #403294, #579DFF, #0747a6)',
            borderRadius: '4px',
            textAlign: 'center',
            color: (theme) => (theme.palette.mode === 'dark' ? '#B6C2CF' : 'white')
          }}
        >
          T
        </Box>
        <Box component="span" sx={{ color: (theme) => (theme.palette.mode === 'dark' ? '#B6C2CF' : 'white') }}>
          Trello Không gian làm việc
        </Box>
      </Box>
    </Box>
  )
}

export default Sidebar
//
