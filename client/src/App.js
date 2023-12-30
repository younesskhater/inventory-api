import React, { useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import './App.css';
import router from './services/Router'
import { useAuth } from './contexts/AuthProvider';

function App() {
  const { auth } = useAuth()

  return <RouterProvider router={ router(Boolean(auth.accessToken)) } />;
}

export default App;
