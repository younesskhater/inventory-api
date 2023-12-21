import React, { useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import './App.css';
import router from './services/Router'

function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false)

  return <RouterProvider router={router} />;
}

export default App;
