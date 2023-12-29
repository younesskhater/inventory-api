import { useContext } from "react";
import AuthContext from "../contexts/AuthProvider";

// api.js
const BASE_URL = process.env.REACT_APP_BASE_URL || '';

export const useFetchWithToken = () => {

    const { auth } = useContext(AuthContext)
    const accessToken = auth.accessToken;

    const fetchWithToken = async (url, options = {}) => {
  
        const headers = {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          // Add other headers as needed
        };
      
        const mergedOptions = {
          ...options,
          headers: {
            ...options.headers,
            ...headers,
          },
        };
      
        try {
          const response = await fetch(`${BASE_URL}${url}`, mergedOptions);
          const data = await response.json();
          return data;
        } catch (error) {
          // Handle errors
          throw error;
        }
      };
    
    return fetchWithToken;
}



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