import { useAuth } from "../../../contexts/AuthProvider"

export default function Dashboard() {

  const { auth } = useAuth
  return (
    <div>Dashboard</div>
  )
}
