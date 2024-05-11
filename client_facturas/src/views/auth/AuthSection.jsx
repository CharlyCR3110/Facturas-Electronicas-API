import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import LoginSection from './LoginSection'
import RegisterSection from './RegisterSection'

const AuthSection = () => {
  return (
    <BrowserRouter>
      <Link to='/login' />
      <Link to='/register' />
      <Routes>
        <Route path='/login' element={<LoginSection sectionName='Iniciar Sesión' />} />
        <Route path='/register' element={<RegisterSection sectionName='Registrarse' />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AuthSection
