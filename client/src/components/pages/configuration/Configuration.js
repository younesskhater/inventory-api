import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Configuration() {
  return (
    <div>
        <aside>
            <h2>Users</h2>
            <h2>Roles</h2>
        </aside>
        <main>
            <Outlet />
        </main>
    </div>
  )
}
