import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google';

import App from './App.jsx'

import React from 'react'


import "bootstrap/dist/css/bootstrap.css"
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <GoogleOAuthProvider clientId="949219434705-3u7ck2qs7tagoi7knmlpd6l80t1vtg5b.apps.googleusercontent.com"> */}
    <App />
  {/* </GoogleOAuthProvider>, */}
  </StrictMode>,
)
