import { createBrowserRouter } from 'react-router-dom'
import Dashboard from '../components/dashboard/Dashboard'
import Login from '../components/login/Login';
import ProductDetails from '../components/pages/products/ProductDetails';
import Layout from '../components/layout/Layout';
import NotFound from '../components/pages/not-found/NotFound';
import Configuration from '../components/pages/configuration/Configuration';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'products',
        children: [
          {
            path: '',
            element: <h2>Products List</h2>
          },
          {
            path: ':id',
            element: <ProductDetails />
          }
        ]
      },
      {
        path: '/configuration',
        element: <Configuration />,
        children: [
          {
            path: '',
            element: <h2>Users List</h2>
          },
          {
            path: 'users',
            element: <h2>Users List</h2>
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
    element: <Login />
  }
])

export default router;