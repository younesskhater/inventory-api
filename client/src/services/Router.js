import { createBrowserRouter, Navigate } from 'react-router-dom'
import Dashboard from '../components/dashboard/Dashboard'
import Login from '../components/pages/login/Login';
import ProductDetails from '../components/pages/products/ProductDetails';
import Layout from '../components/layout/Layout';
import NotFound from '../components/pages/not-found/NotFound';
import Configuration from '../components/pages/configuration/Configuration';
import Products from '../components/pages/products/Products';

const router = (isAuthenticated) => createBrowserRouter([
  {
    path: '/',
    element: !isAuthenticated ? <Navigate to="/login" /> : <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: '',
        element: <Dashboard />
      },
      {
        path: 'products',
        children: [
          {
            path: '',
            element: <Products />
          },
          {
            path: ':id',
            element: <ProductDetails />
          }
        ]
      },
      {
        path: '/configuration/users',
        element: <Configuration />,
        children: [
          {
            path: '',
            element: <h2>Users List</h2>
          },
          {
            path: 'test',
            element: <h2>test</h2>
          },
          {
            path: 'roles',
            element: <h2>Roles</h2>
          }
        ]
      }
    ]
  },
  {
    path: 'login',
    element: isAuthenticated ? <Navigate to="/" /> : <Login />
  }
])

export default router;