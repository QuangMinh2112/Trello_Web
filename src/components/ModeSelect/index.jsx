import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useColorScheme } from '@mui/material/styles'
import LightModeIcon from '@mui/icons-material/LightMode'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import { Box } from '@mui/material'
function ModeSelect() {
  const { mode, setMode } = useColorScheme()

  const handleChange = (event) => {
    setMode(event.target.value)
  }

  return (
    <>
      <FormControl
        size="small"
        sx={{
          minWidth:'120px',
          '& .MuiOutlinedInput-root': {
            '& fieldset':{
              borderColor:'white'
            }
          }
        }}>
        <InputLabel id="demo-simple-select-label"
          sx={{
            color:'white',
            '&.Mui-focused':{ color:'white' }
          }}>
          Mode
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={mode}
          label="Age"
          onChange={handleChange}
          sx={{
            color:'white',
            '.MuiSvgIcon-root':{ color:'white' },
            '.MuiOutlinedInput-notchedOutline':{ borderColor:'white' },
            '&:hover .MuiOutlinedInput-notchedOutline':{ borderColor:'white' },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline':{ borderColor:'white' }

          }}
        >
          <MenuItem value="light">
            <Box style={{ display:'flex', alignItems: 'center', gap:'8px' }}>
              <LightModeIcon />
            Light
            </Box>
          </MenuItem>
          <MenuItem value="dark">
            <Box style={{ display:'flex', alignItems: 'center', gap:'8px' }}>
              <DarkModeOutlinedIcon />
              Dark
            </Box>
          </MenuItem>
          <MenuItem value="system">
            <Box style={{ display:'flex', alignItems: 'center', gap:'8px' }}>
              <SettingsBrightnessIcon />
              System
            </Box>
          </MenuItem>
        </Select>
      </FormControl>
    </>
  )
}
export default ModeSelect