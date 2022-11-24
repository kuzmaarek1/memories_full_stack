import React from 'react'
import { Provider } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { BrowserRouter } from 'react-router-dom'
import store from '@/store'

const AppProviders = ({ children }) => (
  <BrowserRouter>
    <GoogleOAuthProvider
      clientId={import.meta.env.VITE_PUBLIC_GOOGLE_API_TOKEN}
    >
      <Provider store={store}>{children}</Provider>
    </GoogleOAuthProvider>
  </BrowserRouter>
)

export default AppProviders
