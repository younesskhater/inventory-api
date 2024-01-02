import { createBrowserRouter } from 'react-router-dom'
import Login from '../components/pages/login/Login';
import ProductDetails from '../components/pages/products/ProductDetails';
// import Layout from '../components/layout/Layout';
import NotFound from '../components/pages/not-found/NotFound';
import Configuration from '../components/pages/configuration/Configuration';
import Products from '../components/pages/products/Products';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from '../components/pages/dashboard/Dashboard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute />,
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
    element: <Login />
  }
])

export default router;