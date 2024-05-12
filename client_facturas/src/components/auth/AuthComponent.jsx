import React from 'react'
import ErrorComponent from '../error/ErrorComponent'
import '../../assets/css/forms.css'
import '../../assets/css/global.css'

// sectionName (Iniciar Sesion|Registro)
const AuthComponent = ({ formData, setFormData, onSubmit, fields, sectionName, isRegisterSuccess, errorMessage, setErrorMessage }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className='wrap'>
      <div className='left-column'>
        <div className='hero'>
          <p className='kicker'>{sectionName === 'Iniciar Sesión' ? 'Acceso Seguro' : 'Bienvenido'}</p>
          <h1>
            {sectionName === 'Iniciar Sesión' ? 'Inicia Sesión' : 'Únete a Nosotros'}<br />
            {sectionName === 'Iniciar Sesión' ? 'para Gestionar tus Facturas' : '!'}
            <span className='dot'>.</span>
          </h1>
          <p>
            {sectionName === 'Iniciar Sesión' ? 'Ingresa a tu cuenta para administrar tus facturas electrónicas de forma rápida y segura.' : 'Regístrate y forma parte de nuestra comunidad de facturación electrónica.'}
          </p>
        </div>
      </div>

      <div className='right-column'>
        {isRegisterSuccess &&
          <div className='confirmation-message'>
            <p>¡Registro exitoso! Debe esperar a que un administrador apruebe su cuenta.</p>
            <a className='btn btn-secondary' href='/login'>Iniciar Sesión</a>
          </div>}

        {!isRegisterSuccess && (
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
          </div>
        )}
      </div>
      {errorMessage && <ErrorComponent error={errorMessage} onClose={() => setErrorMessage('')} />}
    </div>
  )
}

export default AuthComponent
