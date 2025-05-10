import { useState, useMemo, useEffect } from 'react'
import AuthContext from './AuthContext.jsx'

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('jwtToken'))

  const logIn = (token, username) => {
    console.log('Текущее имя: ', username)
    localStorage.setItem('jwtToken', token)
    localStorage.setItem('username', username)
    setLoggedIn(true)
  }

  const logOut = () => {
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('username')
    setLoggedIn(false)
  }

  useEffect(() => {
    const token = localStorage.getItem('jwtToken')
    if (token) {
      setLoggedIn(true)
    }
  }, [])

  const authValue = useMemo(() => {
    return { loggedIn, logIn, logOut }
  }, [loggedIn])

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
