import React from 'react'
import AccountInfoSection from '../account_info/AccountInfoSection'
import ProductsSection from '../products/ProductsSection'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/account_info' element={<AccountInfoSection />} />
        <Route path='/products' element={<ProductsSection />} />
      </Routes>
    </BrowserRouter>
  )
}

export default MainRouter
