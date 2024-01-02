import { useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthProvider'

const LOGOUT_URL = `${process.env.NODE_ENV !== 'production' ? process.env.REACT_APP_BASE_URL : '' }/api/logout`

export default function Header() {

  const { auth, setAuth } = useAuth()
  const [errorMsg, setErrorMsg] = useState('')

  const navigate = useNavigate()
  const location = useLocation()

  const logout = () => {
        fetch(LOGOUT_URL, {
            method: "get",
            credentials: 'include',
            headers: {
                 "Content-Type": "application/json"
            }
        })
          .then(() => {
            setAuth({user: null, accessToken: '' })
            navigate('/login', { replace: true})
          }).catch((error) => {
            if (error?.message) {
              setErrorMsg(error.message)
            } else {
              setErrorMsg('No server response, please try later')
            }
            // errorRef.current.focus()
          });
  }

  return (
    <header>
      <nav>
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/products">Products</NavLink>    
        <NavLink to="/configuration/users">Configuration</NavLink>
        <NavLink onClick={logout}>Logout</NavLink>
        {/* <NavLink to="/login" state={{from: location}}>login</NavLink> 
          auth.accessToken 
          ? <button >Logout</button>
          : <NavLink to="/login">Login</NavLink>
        */}

        { 
        }
        
      </nav>
    </header>
  )
}
