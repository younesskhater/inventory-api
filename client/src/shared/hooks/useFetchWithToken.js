import { useAuth } from "../../contexts/AuthProvider";
import useRefreshToken from "./useRefreshToken";

// api.js
const BASE_URL = process.env.NODE_ENV !== 'production' ? process.env.REACT_APP_BASE_URL : '' ;

export const useFetchWithToken = () => {

    const { auth } = useAuth()
    const refreshToken = useRefreshToken()
    const accessToken = auth.accessToken;

    const fetchWithToken = async (url, options = {}, token = accessToken) => {
        const headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          // Add other headers as needed
        };
      
        const mergedOptions = {
          ...options,
          credentials: 'include',
          headers: {
            ...options.headers,
            ...headers,
          },
        };
      
        try {
          const response = await fetch(`${BASE_URL}${url}`, mergedOptions);

          if (response?.status === 401 && !url.includes('refreshToken')) {
            const newAccessToken = await refreshToken()
            if (!newAccessToken) {
              throw new Error(`Could\'t retry ${url} call`)
            }
            const data = await fetchWithToken(url, {}, newAccessToken)
            return data
          }
          const data = await response.json();
          return data;
        } catch (error) {
            console.log(error)
          throw error;
        }
      };
    
    return fetchWithToken;
}

//  401 "error": {
//   "name": "TokenExpiredError",
//   "message": "jwt expired",
//   "expiredAt": "2023-12-27T03:54:31.000Z"
// }

// export const get = async (url) => {
//     const fetchWithToken = useFetchWithToken();
//     return fetchWithToken(url);
// };

// export const post = async (url, data) => {
//     const fetchWithToken = useFetchWithToken();
//     return fetchWithToken(url, {
//         method: 'POST',
//         body: JSON.stringify(data),
//     });
// };