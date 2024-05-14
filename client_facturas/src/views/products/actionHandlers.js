export const handleDelete = (row, setErrorMessage, setUpdatedElements) => {
  const idProducto = row[0]
  fetch(`http://localhost:8080/api/products/delete/${idProducto}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al eliminar el producto')
      }

      fetchUpdatedProducts(setUpdatedElements)

      console.log('Producto eliminado correctamente')
    })
    .catch(error => {
      console.error('Error al eliminar el producto:', error.message)
      setErrorMessage(`Error al eliminar el producto con id ${idProducto}`)
    })
}

const fetchUpdatedProducts = async (setProducts) => {
  try {
    const response = await fetch('http://localhost:8080/api/products/', {
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
  } catch (error) {
    console.error('Error al obtener los productos:', error.message)
  }
}

export const handleEdit = async (currentElementId, formData, setErrorMessage, setUpdatedElements, handleClosePopup) => {
  try {
    // URL de la solicitud
    const apiUrl = `http://localhost:8080/api/products/update/${currentElementId}`

    const response = await fetch(apiUrl, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    if (!response.ok) {
      throw new Error('Error al editar el producto')
    }

    console.log('Producto editado correctamente')

    fetchUpdatedProducts(setUpdatedElements)

    handleClosePopup()
  } catch (error) {
    console.error('Error al editar el producto:', error.message)
    setErrorMessage(`Error al editar el producto con id ${currentElementId}`)
  }
}

export const handleAdd = async (currentElementId, formData, setErrorMessage, setUpdatedElements, handleClosePopup) => {
  try {
    const response = await fetch('http://localhost:8080/api/products/add', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    if (!response.ok) {
      throw new Error('Error al agregar el producto')
    }

    console.log('Producto agregado correctamente')

    fetchUpdatedProducts(setUpdatedElements)

    handleClosePopup()
  } catch (error) {
    console.error('Error al agregar el producto:', error.message)
    setErrorMessage('Error al agregar el producto')
  }
}

export const handleSearch = async (searchValue, setErrorMessage, setUpdatedElements) => {
  try {
    const response = await fetch(`http://localhost:8080/api/products/search?searchName=${searchValue}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('Error al buscar productos')
    }

    const data = await response.json()
    setUpdatedElements(data)
  } catch (error) {
    console.error('Error al buscar productos:', error.message)
    setErrorMessage('Error al buscar productos')
  }
}

export const handleSendToInvoice = async (row, setErrorMessage) => {
  const idProducto = row[0]
  try {
    const response = await fetch(`http://localhost:8080/api/invoices/sendProductToInvoiceCreator?idProducto=${idProducto}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('Error al enviar el producto a la factura')
    }

    console.log('Producto enviado a la factura correctamente')
    const data = await response.json()
    console.log(data)
    window.sessionStorage.setItem('onInvoiceProducts', JSON.stringify(data))
  } catch (error) {
    console.error('Error al enviar el producto a la factura:', error.message)
    setErrorMessage(`Error al enviar el producto con id ${idProducto} a la factura`)
  }
}
