import React, { useState, useEffect } from 'react'
import HeaderComponent from '../../components/fragments/HeaderComponent'
import SideNavbar from '../../components/fragments/SideNavbar'
import PopupComponent from '../../components/popups/PopupComponent'
import { handleRemoveClientFromCart, handleRemoveFromCart, handleQuantityChange, handleClientSearchSubmit, handleAddProductToCartSubmit } from './actionHandlers'
import '../../assets/css/global.css'
import '../../assets/css/invoice_creator.css'
import '../../assets/css/fragments/header.css'
import '../../assets/css/fragments/nav.css'
import { Link } from 'react-router-dom'

const InvoiceCreatorSection = () => {
  const [client, setClient] = useState(window.sessionStorage.getItem('onInvoiceClient') ? JSON.parse(window.sessionStorage.getItem('onInvoiceClient')) : null)
  const [cart, setCart] = useState(window.sessionStorage.getItem('onInvoiceProducts') ? JSON.parse(window.sessionStorage.getItem('onInvoiceProducts')) : [])
  const [errorMessage, setErrorMessage] = useState('')

  const loggedUser = { nombre: 'Juan' }
  useEffect(() => {
    console.log('useEffect para obtener cliente y carrito de sessionStorage')
    // Obtener cliente de sessionStorage
    const clientFromStorage = JSON.parse(window.sessionStorage.getItem('onInvoiceClient'))
    if (clientFromStorage) {
      setClient(clientFromStorage)
    }

    // Obtener productos de sessionStorage
    const productsFromStorage = JSON.parse(window.sessionStorage.getItem('onInvoiceProducts'))
    console.log(productsFromStorage)
    if (productsFromStorage) {
      setCart(productsFromStorage)
    }
  }, [])

  // actualizar la pagina cuando se cambie el cliente o el carrito
  useEffect(() => {
    window.sessionStorage.setItem('onInvoiceClient', JSON.stringify(client))
    window.sessionStorage.setItem('onInvoiceProducts', JSON.stringify(cart))
  }, [client, cart])

  const handleInvoiceSubmit = (event) => {
    console.log('handleInvoiceSubmit')
  }

  return (
    <>
      <HeaderComponent loggedUser={{ nombre: loggedUser.nombre }} />
      <SideNavbar currentPage='invoiceCreator' />
      <div className='invoice-info-container'>
        <section className='invoice-info'>
          <h2>Facturar</h2>
          <div className='invoice-creator'>

            {!client
              ? (
            // export const handleClientSearchSubmit = async (event, setClient, setErrorMessage) => {

                <form onSubmit={(event) => { handleClientSearchSubmit(event, setClient, setErrorMessage) }}>
                  <div className='form-group'>
                    <div className='client-selection'>
                      <h3>Seleccionar Cliente</h3>
                      <label htmlFor='client'>Identificación del Cliente</label>
                      <input type='text' id='client' name='client' placeholder='Identificación del Cliente' required />
                      <button type='submit' className='action-btn'>Buscar</button>
                      <p>¿No conoces la identificación del cliente? <a href='/clients'>Ir a la página de clientes</a></p>
                    </div>
                  </div>
                </form>
                )
              : (
                <>
                  <div className='client-info'>
                    <h3>Cliente</h3>
                    <p>Cliente Seleccionado: {client.nombre}</p>
                    <div className='form-group'>
                      <div className='client-actions'>
                        <button type='submit' className='action-btn' onClick={() => handleRemoveClientFromCart(setClient)}>Cambiar Cliente</button>
                      </div>
                    </div>
                  </div>
                </>
                )}

            <form onSubmit={(event) => { handleAddProductToCartSubmit(event, cart, setCart, setErrorMessage) }}>
              <div className='form-group'>
                <div className='product-selection'>
                  <h3>Agregar Producto al Carrito</h3>
                  <label htmlFor='product'>Nombre del Producto</label>
                  <input
                    type='text'
                    id='product'
                    placeholder='Producto a buscar'
                    required
                  />
                  <label htmlFor='quantity'>Cantidad</label>
                  <input
                    type='number'
                    id='quantity'
                    min='1'
                    placeholder='Cantidad deseada'
                    required
                  />
                  <button type='submit' className='action-btn'>
                    Agregar
                  </button>
                  <p>
                    ¿No conoces el nombre del producto?{' '}
                    <Link to='/products'>Ir a la página de productos</Link>
                  </p>
                </div>
              </div>
            </form>

            {cart.length > 0 && (
              <div className='cart'>
                <h3>Carrito</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Cantidad</th>
                      <th>Precio Unitario</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr key={item.product.idProducto}>
                        <td>{item.product.nombre}</td>
                        <td className='quantity-cell'>
                          <button
                            onClick={() => handleQuantityChange(item.product.idProducto, -1, cart, setCart)}
                            className='quantity-controller-btn'
                          >
                            -
                          </button>
                          <span className='quantity-number'>{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.product.idProducto, 1, cart, setCart)}
                            className='quantity-controller-btn'
                          >
                            +
                          </button>
                        </td>
                        <td>{item.product.precioUnitario}</td>
                        <td>{(item.product.precioUnitario * item.quantity).toFixed(2)}</td>
                        <td>
                          <button onClick={() => handleRemoveFromCart(item.product.idProducto, cart, setCart)} />
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan='3'>Total</td>
                      <td>{(cart.reduce((acc, item) => acc + item.product.precioUnitario * item.quantity, 0)).toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {cart.length > 0 && client && (
              <form onSubmit={handleInvoiceSubmit}>
                <div className='form-group'>
                  <div className='invoice-actions'>
                    <button type='submit' className='action-btn'>
                      Facturar
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </section>
      </div>
      {errorMessage && <PopupComponent message={errorMessage} onClose={() => setErrorMessage('')} type='error' />}
    </>
  )
}

export default InvoiceCreatorSection
