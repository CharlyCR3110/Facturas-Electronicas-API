import AuthRouter from './views/auth/AuthRouter'
import MainRouter from './views/main/MainRouter'

function App () {
  return (
    <div className='App'>
      <AuthRouter />
      <MainRouter />
    </div>
  )
}

export default App
