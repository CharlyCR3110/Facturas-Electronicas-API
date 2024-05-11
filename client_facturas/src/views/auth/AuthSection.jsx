import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginSection from './LoginSection'
import RegisterSection from './RegisterSection'

const AuthSection = ({ setLoggedUser }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginSection sectionName='Iniciar Sesión' setLoggedUser={setLoggedUser} />} />
        <Route path='/register' element={<RegisterSection sectionName='Registrarse' />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AuthSection
