import { useEffect, useState } from 'react'
import { useFetchWithToken } from '../../../shared/hooks/useFetchWithToken'

export default function Products() {

    const [products, setProducts] = useState()

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
    }, [])
    
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
