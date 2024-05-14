import React, { useState } from 'react'

const SearchComponent = ({ inputName, inputPlaceHolder, onSubmit, setErrorMessage, setFoundElements }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(searchTerm, setErrorMessage, setFoundElements)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        name={inputName}
        placeholder={inputPlaceHolder}
        value={searchTerm}
        onChange={handleChange}
      />
      <button type='submit' className='action-btn'>
        Buscar
      </button>
    </form>
  )
}

export default SearchComponent
