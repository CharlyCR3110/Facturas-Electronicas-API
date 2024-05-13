export const handleDelete = (row, setErrorMessage) => {
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

      window.location.reload()
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
