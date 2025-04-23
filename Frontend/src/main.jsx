import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router-dom'
import router from './Router.jsx'
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider  router={router}/>
   
  </StrictMode>,
)
