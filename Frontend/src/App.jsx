import React from 'react'
import Login from './pages/Login/Login.jsx'
import Signup from './pages/Registration/Registration.jsx'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword.jsx'
import Home from './pages/HomePage/Home.jsx'
import {Routes, Route} from 'react-router-dom'
function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path='/forgotpassword' element = {<ForgotPassword/>}></Route>
      <Route path='/home' element={<Home/>}></Route>
    </Routes>
    </>
  )
}

export default App
