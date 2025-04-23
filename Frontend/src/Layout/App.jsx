import { useState } from 'react'

// import './App.css'

import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { UserProvider, UserContext } from '../context/Context'; // Import context
function App() {
 

  return (
    <>
    <UserProvider>
    <Header/>
 <main>
<Outlet/>
</main>
<Footer/>
</UserProvider>
    </>
  )
}

export default App
