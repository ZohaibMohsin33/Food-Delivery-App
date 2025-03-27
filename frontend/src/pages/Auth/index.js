import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Register from './Register/Register'
import Signin from './Signin/Signin'

export default function Index() {
  return (
    <Routes path="/">
        <Route path='/register' element={<Register />} />
        <Route path='/signin' element={<Signin />} />
      
    </Routes>
  )
}
