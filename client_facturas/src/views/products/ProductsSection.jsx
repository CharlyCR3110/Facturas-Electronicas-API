import React, { useEffect, useState } from 'react'
import TitleComponent from '../../components/pages/TitleComponent'
import TableComponent from '../../components/pages/TableComponent'
import HeaderComponent from '../../components/fragments/HeaderComponent'
import SideNavbar from '../../components/fragments/SideNavbar'
import PopupComponent from '../../components/popups/PopupComponent'
import { handleDelete, handleEdit } from './actionHandlers'
import '../../assets/css/global.css'
import '../../assets/css/product-client-invoice-styles.css'
import '../../assets/css/fragments/header.css'
import '../../assets/css/fragments/nav.css'

const ProductsSection = () => {
  const getAllProductsApiUrl = 'http://localhost:8080/api/products/'
  // Estado para almacenar los clientes
  const [products, setProducts] = useState([])
  const [currentProduct, setCurrentProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const loggedUser = JSON.parse(window.sessionStorage.getItem('loggedUser'))

  if (!loggedUser) {
    window.location.href = 'http://localhost:5173/login'
    console.error('Usuario no autenticado')
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(getAllProductsApiUrl, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error('Error al obtener los productos')
        }

        const data = await response.json()
        setProducts(data)
        setLoading(false)
      } catch (error) {
        console.error('Error al obtener los productos:', error.message)
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const currentProductName = currentProduct ? currentProduct[1] : ''
  const currentProductDescription = currentProduct ? currentProduct[2] : ''
  const currentProductPrice = currentProduct ? currentProduct[3] : ''

  const popupHeaders = ['Id Producto', 'Nombre', 'Descripcion', 'Precio Unitario']

  const popupFields = [
    { name: 'nombre', label: 'Nombre', type: 'text', value: currentProductName },
    { name: 'descripcion', label: 'Descripción', type: 'text', value: currentProductDescription },
    { name: 'precioUnitario', label: 'Precio Unitario', type: 'number', value: currentProductPrice }
  ]

  return (
    <>
      {loading
        ? <p>Cargando productos...</p>
        : (
          <>
            <HeaderComponent loggedUser={{ nombre: loggedUser.nombre }} />
            <SideNavbar currentPage='products' />
            <div className='container-container'>
              <div className='container'>
                <TitleComponent title='Products' />
                <TableComponent
                  headers={popupHeaders}
                  data={products.map(product => [product.idProducto, product.nombre, product.descripcion, product.precioUnitario])}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  handleSendToInvoice={product => console.log(product)}
                  setErrorMessage={setErrorMessage}
                  popupTitle='Editar Producto'
                  popupFields={popupFields}
                  setCurrentElement={setCurrentProduct}
                  setProducts={setProducts}
                />
              </div>
            </div>
          </>
          )}
      {errorMessage && <PopupComponent message={errorMessage} onClose={() => setErrorMessage('')} type='error' />}
    </>
  )
}

export default ProductsSection
