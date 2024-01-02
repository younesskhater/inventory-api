import { Navigate, useLocation } from "react-router-dom"
import Layout from "../components/layout/Layout"
import { useAuth } from "../contexts/AuthProvider"

export default function ProtectedRoute() {

    const { auth } = useAuth()
    const location = useLocation()

    if (!auth.accessToken) {
        // return null; // or loading indicator/spinner/etc
    }

  return auth.accessToken ? <Layout /> : <Navigate to="/login" replace state={{ from: location }} />
}
