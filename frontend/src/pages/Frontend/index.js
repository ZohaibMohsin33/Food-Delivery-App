import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Home/Home'
import MyOrders from './MyOrders/MyOrders'


export default function Index() {
  return (

    <>

       <Routes path='/'>
         <Route index element={<Home />} />
         <Route path='/myOrders' element={<MyOrders />} />
        </Routes>


    </>
       
  )
}
