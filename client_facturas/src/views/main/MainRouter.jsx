import React from 'react'
import AccountInfoContainer from '../account_info/AccountInfoContainer'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/account_info' element={<AccountInfoContainer />} />
      </Routes>
    </BrowserRouter>
  )
}

export default MainRouter
