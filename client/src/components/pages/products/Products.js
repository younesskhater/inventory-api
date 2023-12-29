import { useContext, useEffect, useState } from 'react'
import AuthContext from '../../../contexts/AuthProvider'
import { useFetchWithToken } from '../../../services/BaseApi'

const PRODUCTS_URL = `${process.env.REACT_APP_BASE_URL || '' }/api/products`

export default function Products() {

    let isMounted = true
    const [products, setProducts] = useState()
    const { auth, setAuth } = useContext(AuthContext)

    const fetchWithtoken = useFetchWithToken()

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await fetchWithtoken('/api/products')
          setProducts(response.data)
        } catch (error) {

        }
      }
      fetchProducts()
      // fetchAllProducts()
    }, [])

      const fetchAllProducts = () => {
        // setAuthentInfo({ loading: true });
        fetch(PRODUCTS_URL, {
            method: "get",
            headers: {
                 "Content-Type": "application/json"
            }
        })
          .then((res) => res.json())
          .then((resp) => {
            // setAuthentInfo({ loading: false, resp });
            isMounted && setProducts(resp.data)
          }).catch((error) => {
            console.log('Error ======> ',error)
          });
      }
    
  return (
    <article>
      <h2>Products</h2>
      {products?.length ? 
      (<ul>
        { products.map((product, i) => 
          <li key={i}> { `${product?.name} : (${product?.category})` } </li>)
        }
      </ul>) 
      : <p> Pas de produits à afficher</p>
      }
    </article>
  )
}
