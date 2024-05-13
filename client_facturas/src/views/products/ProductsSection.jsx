import React, { useEffect, useState } from 'react'
import TitleComponent from '../../components/pages/TitleComponent'
import TableComponent from '../../components/pages/TableComponent'
import HeaderComponent from '../../components/fragments/HeaderComponent'
import SideNavbar from '../../components/fragments/SideNavbar'
import '../../assets/css/global.css'
import '../../assets/css/product-client-invoice-styles.css'
import '../../assets/css/fragments/header.css'
import '../../assets/css/fragments/nav.css'

const ProductsSection = () => {
  // Estado para almacenar los clientes
  const [products, setProducts] = useState([])
  const getAllProductsApiUrl = 'http://localhost:8080/api/products/'
  const [loading, setLoading] = useState(true)

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

  if (loading) {
    return <div>Cargando...</div>
  }

  return (
    <>
      <HeaderComponent loggedUser={{ nombre: loggedUser.nombre }} />
      <SideNavbar currentPage='products' />
      <div className='container-container'>
        <div className='container'>
          <TitleComponent title='Products' />
          <TableComponent
            headers={['Id Producto', 'Nombre', 'Descripcion', 'Precio Unitario']}
            data={products.map(product => [product.idProducto, product.nombre, product.descripcion, product.precioUnitario])}
            handleEdit={product => console.log(product)}
            handleDelete={product => console.log(product)}
            handleSendToInvoice={product => console.log(product)}
          />
        </div>
      </div>
    </>
  )
}

export default ProductsSection
