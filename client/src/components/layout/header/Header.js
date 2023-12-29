import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import AuthContext from '../../../contexts/AuthProvider'

const LOGOUT_URL = `${process.env.REACT_APP_BASE_URL || '' }/api/logout`

export default function Header() {

  const { auth, setAuth } = useContext(AuthContext)
  const [errorMsg, setErrorMsg] = useState('')

  const navigate = useNavigate()

  console.log('HEADER ', auth)

  const logout = () => {
        fetch(LOGOUT_URL, {
            method: "get",
            headers: {
                 "Content-Type": "application/json"
            }
        })
          // .then((resp) => { 
          //   console.log('resp 1 ', resp)
          //   return resp.json()
          // })
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
        <NavLink to="/configuration">Configuration</NavLink>

        { auth.accessToken ? <button onClick={logout}>Logout</button> : <NavLink to="/login">Logout</NavLink>}
        
      </nav>
    </header>
  )
}
