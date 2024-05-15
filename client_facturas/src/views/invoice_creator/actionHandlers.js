export const handleAddClientToInvoice = async (clientIdentification, setClient, setErrorMessage) => {
  try {
    const response = await fetch(`http://localhost:8080/api/invoices/selectClient?client=${clientIdentification}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('Error al agregar el cliente a la factura')
    }

    const data = await response.json()
    console.log(data)
    setClient(data)
  } catch (error) {
    setErrorMessage(`Error al agregar el cliente con id ${clientIdentification} a la factura`)
  }
}

export const handleRemoveClientFromCart = (setClient) => {
  setClient(null)
}

export const handleRemoveFromCart = (productId, cart, setCart) => {
  const newCart = cart.filter(item => item.product.idProducto !== productId)
  setCart(newCart)
}

export const handleQuantityChange = (productId, change, cart, setCart) => {
  console.log('handleQuantityChange', cart)
  const index = cart.findIndex(item => item.product.idProducto === productId)

  if (index === -1) {
    return
  }

  const newCart = [...cart]

  if (newCart[index].quantity + change <= 0) {
    handleRemoveFromCart(productId, newCart, setCart)
    return
  }

  newCart[index].quantity += change

  setCart(newCart)
}

export const handleClientSearchSubmit = async (event, setClient, setErrorMessage) => {
  event.preventDefault()
  const idCliente = event.target.client.value
  handleAddClientToInvoice(idCliente, setClient, setErrorMessage)
}

export const handleAddProductToCartSubmit = async (event, cart, setCart, setErrorMessage) => {
  event.preventDefault()
  const idProducto = event.target.product.value
  const cantidad = event.target.quantity.value
  console.log(cart)

  try {
    const response = await fetch(`http://localhost:8080/api/invoices/addToCart?productName=${idProducto}&quantity=${cantidad}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cart)
    })

    if (!response.ok) {
      throw new Error('Error al agregar el producto al carrito')
    }

    const data = await response.json()
    console.log(data.cart)
    setCart(data.cart)
  } catch (error) {
    setErrorMessage(`Error al agregar el producto con id ${idProducto} al carrito`)
  }
}
