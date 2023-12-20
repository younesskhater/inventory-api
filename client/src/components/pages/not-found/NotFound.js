import React from 'react'
import { NavLink, useRouteError } from 'react-router-dom'

export default function NotFound() {
    const error = useRouteError()
  return (
    <div>
        <h1>Page not found 404</h1>
        <p>
        { error?.error?.toString() ?? error?.toString() }
        </p>
        <NavLink to="dashboard" >Go back home :D </NavLink>
    </div>
    
  )
}
