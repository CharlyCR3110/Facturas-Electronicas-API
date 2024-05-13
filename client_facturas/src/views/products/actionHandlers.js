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
