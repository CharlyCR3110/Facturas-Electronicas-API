import React from 'react'
import AccountInfoSection from '../account_info/AccountInfoSection'
import ProductsSection from '../products/ProductsSection'
import ClientsSections from '../clients/ClientsSection'
import InvoicesSection from '../invoices/InvoicesSection'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/account_info' element={<AccountInfoSection />} />
        <Route path='/clients' element={<ClientsSections />} />
        <Route path='/products' element={<ProductsSection />} />
        <Route path='/invoices' element={<InvoicesSection />} />
      </Routes>
    </BrowserRouter>
  )
}

export default MainRouter
