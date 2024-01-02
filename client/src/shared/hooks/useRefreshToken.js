import { useAuth } from "../../contexts/AuthProvider"


export default function useRefreshToken() {

  const { setAuth } = useAuth()
  // const fetchWithToken = useFetchWithToken() 
  // use it if we decide to send accessToken and verify if it's the same user
  const AUTHORIZATION_STATUS = [401, 403]

  const refreshToken = async () => {
    const REFRESH_URL = `${process.env.NODE_ENV !== 'production' ? process.env.REACT_APP_BASE_URL : '' }/api/refreshToken`
    try {
      const response = await fetch(REFRESH_URL, {
        method: "get",
        credentials: 'include',
        headers: {
             "Content-Type": "application/json"
        },
        
      })
      if (AUTHORIZATION_STATUS.includes(response.status)) {
        setAuth({})
        throw new Error('Please Sign in')
      }
      const data = await response.json()
      setAuth(prev => {
        return { ...prev, accessToken: data.accessToken }
        }
      )
      return data.accessToken
    } catch (error) {
      console.log(error) // change it with toast error
    }
  }

  return refreshToken
}
