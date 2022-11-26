import React from 'react'
import { Provider } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { BrowserRouter } from 'react-router-dom'
import store from '@/store'
import { Toaster } from 'react-hot-toast'

const AppProviders = ({ children }) => (
  <BrowserRouter>
    <GoogleOAuthProvider
      clientId={import.meta.env.VITE_PUBLIC_GOOGLE_API_TOKEN}
    >
      <Toaster
        toastOptions={{
          style: {
            fontFamily: 'Arial, Helvetica, sans-serif',
          },
        }}
      />
      <Provider store={store}>{children}</Provider>
    </GoogleOAuthProvider>
  </BrowserRouter>
)

export default AppProviders
