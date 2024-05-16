export const fetchProducts = async (setProducts, setLoading) => {
  try {
    const response = await fetch('http://localhost:8080/api/products/', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      if (response.status === 401) {
        window.location.href = '/login'
      }

      throw new Error('Error al obtener los productos')
    }

    const data = await response.json()
    setProducts(data)
    setLoading(false)
  } catch (error) {
    setLoading(false)
  }
}

export const handleDelete = async (row, setErrorMessage, setUpdatedElements) => {
  const idProducto = row[0]
  try {
    const response = await fetch(`http://localhost:8080/api/products/delete/${idProducto}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/text'
      }
    })

    if (!response.ok) {
      const errorMessage = await response.text()
      throw new Error(errorMessage || 'Error al eliminar el producto')
    }
  } catch (error) {
    setErrorMessage(error.message)
  } finally {
    fetchProducts(setUpdatedElements, null)
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
      const errorMessage = await response.text()

      throw new Error(errorMessage || 'Error al editar el producto')
    }

    handleClosePopup()
  } catch (error) {
    setErrorMessage(error.message)
  } finally {
    fetchProducts(setUpdatedElements, null)
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
      const errorMessage = await response.text()

      throw new Error(errorMessage || 'Error al agregar el producto')
    }

    fetchProducts(setUpdatedElements, null)

    handleClosePopup()
  } catch (error) {
    setErrorMessage(error.message)
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
    setErrorMessage('Error al buscar productos')
  }
}

export const handleSendToInvoice = async (row, setErrorMessage) => {
  const idProducto = row[0]
  const onInvoiceProducts = JSON.parse(window.sessionStorage.getItem('onInvoiceProducts'))
  let body = []
  if (onInvoiceProducts) {
    body = onInvoiceProducts
  }

  try {
    const response = await fetch(`http://localhost:8080/api/invoices/sendProductToInvoiceCreator?idProducto=${idProducto}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    if (!response.ok) {
      const errorMessage = await response.text()

      throw new Error(errorMessage || 'Error al enviar el producto a la factura')
    }

    const data = await response.json()
    window.sessionStorage.setItem('onInvoiceProducts', JSON.stringify(data.cart))
  } catch (error) {
    setErrorMessage(error.message)
  }
}
