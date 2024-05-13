import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginSection from './LoginSection'
import RegisterSection from './RegisterSection'

const AuthSection = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginSection sectionName='Iniciar Sesión' />} />
        <Route path='/register' element={<RegisterSection sectionName='Registrarse' />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AuthSection
