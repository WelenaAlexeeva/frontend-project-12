import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegistrationPage from './pages/RegistrationPage'
import NotFoundPage from './pages/NotFoundPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthProvider from './context/AuthProvider'
import { ToastContainer } from 'react-toastify'
import routes from './routes'
import MainMenu from './components/MainMenu'

// import './App.css';

function App() {
  return (
    <div className="d-flex flex-column vh-100">
      <BrowserRouter>
        <ToastContainer />
        <AuthProvider>
          <MainMenu />
          <Routes>
            <Route path={routes.homePagePath} element={<HomePage />} />
            <Route path={routes.loginPagePath} element={<LoginPage />} />
            <Route path={routes.registrationPagePath} element={<RegistrationPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
