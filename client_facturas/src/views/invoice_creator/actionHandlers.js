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
