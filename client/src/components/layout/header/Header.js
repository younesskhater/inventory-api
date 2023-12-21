import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import AuthContext from '../../../contexts/AuthProvider'

export default function Header() {
  const { auth } = useContext(AuthContext)
  console.log(auth)
  return (
    <header>
      <nav>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/login">login</NavLink>      
        <NavLink to="/configuration">Configuration</NavLink>
      </nav>
    </header>
  )
}
