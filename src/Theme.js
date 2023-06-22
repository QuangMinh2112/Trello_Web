import { cyan, deepOrange, orange, teal } from '@mui/material/colors'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

// Create a theme instance.
const Theme = extendTheme({
  trello:{
    appBarHeight:'60px',
    boardBarHeight:'60px'
  },
  colorSchemes: {
    light: {
      palette: {
        primary: teal,
        secondary:deepOrange
      }
    },
    dark: {
      palette: {
        primary:cyan,
        secondary:orange
      }
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          textTransform: 'none'
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root:({ theme }) => {
          return {
            color:theme.palette.primary.light,
            fontSize:'0.875rem'
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root:({ theme }) => {
          return {
            color:theme.palette.primary.main,
            fontSize:'0.875rem',
            '.MuiOutlinedInput-notchedOutline':{
              borderColor:theme.palette.primary.light
            },
            '&:hover':{
              '.MuiOutlinedInput-notchedOutline':{
                borderColor:theme.palette.primary.main
              }
            }
          }
        }
      }
    }
  }
})


export default Theme
