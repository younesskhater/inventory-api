import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Header() {
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
