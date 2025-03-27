import React from 'react'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Frontend from "./Frontend/"
import Auth from "./Auth"
import Header from './Components/Header'
import Footer from './Components/Footer'


export default function Index() {
  return (
    <BrowserRouter>
      
         <Header />
         <main >
         <Routes>
            
            <Route path='/*' element={<Frontend />} />
            <Route path='/auth/*' element={<Auth />} />
         
         </Routes>
         </main >
         <Footer />
      
      
    </BrowserRouter>
  )
}
