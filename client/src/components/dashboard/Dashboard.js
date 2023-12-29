import { useContext } from 'react'
import AuthContext from '../../contexts/AuthProvider'

export default function Dashboard() {
  const { auth } = useContext(AuthContext)
  return (
    <div>Dashboard</div>
  )
}
