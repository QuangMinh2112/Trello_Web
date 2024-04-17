import ReactDOM from 'react-dom/client'
import App from '~/App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import '~/index.css'
import 'react-toastify/dist/ReactToastify.css'
import theme from './Theme'
import { ToastContainer } from 'react-toastify'
import { ConfirmProvider } from 'material-ui-confirm'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './redux/store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <CssVarsProvider theme={theme}>
    <ConfirmProvider
      defaultOptions={{
        allowClose: false,
        confirmationButtonProps: { color: 'error', variant: 'outlined' },
        cancellationButtonProps: { color: 'primary' },
        dialogProps: { maxWidth: 'xs' },
        buttonOrder: ['confirm', 'cancel']
      }}
    >
      <CssBaseline />
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </BrowserRouter>
      <ToastContainer autoClose={2000} theme="colored" />
    </ConfirmProvider>
  </CssVarsProvider>
)
