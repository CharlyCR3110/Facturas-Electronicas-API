import React, { useState, useEffect } from 'react'
import '../../assets/css/forms.css'
import '../../assets/css/global.css'

// sectionName (Iniciar Sesion|Registro)
const AuthComponent = ({ formData, setFormData, onSubmit, fields, sectionName }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className='wrap'>
      <div className='left-column'>
        <div className='hero'>
          <p className='kicker'>{sectionName === 'Iniciar Sesion' ? 'Acceso Seguro' : 'Bienvenido'}</p>
          <h1>
            {sectionName === 'Iniciar Sesion' ? 'Inicia Sesión' : 'Únete a Nosotros'}<br />
            {sectionName === 'Iniciar Sesion' ? 'para Gestionar tus Facturas' : '!'}
            <span className='dot'>.</span>
          </h1>
          <p>
            {sectionName === 'Iniciar Sesion' ? 'Ingresa a tu cuenta para administrar tus facturas electrónicas de forma rápida y segura.' : 'Regístrate y forma parte de nuestra comunidad de facturación electrónica.'}
          </p>
        </div>
      </div>

      <div className='right-column'>
        <div className='form'>
          <h2>{sectionName}</h2>
          <form onSubmit={onSubmit}>
            {fields.map((field) => (
              <div key={field.name} className='form-group'>
                <label htmlFor={field.name}>{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
            <button type='submit' className='btn btn-primary'>{sectionName}</button>
          </form>
          <a className='btn btn-secondary' href={sectionName === 'Iniciar Sesión' ? '/register' : '/login'}>
            {sectionName === 'Iniciar Sesión' ? 'Registrarse' : 'Iniciar Sesión'}
          </a>
          <div className='copyright'>
            <p>Copyright &copy; 2024. Todos los derechos reservados.</p>
          </div>
          {sectionName === 'Iniciar Sesion' && (
            <a className='admin-login' href='/admins/login'>Acceso de Administradores</a>
          )}
        </div>

        <input type='checkbox' id='errorToggle' className='error-toggle' />
        <div className='error-overlay'>
          <div className='error-popup'>
            <label htmlFor='errorToggle' className='close-btn'>&times;</label>
            <p className='error-message' id='errorMessage' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthComponent
