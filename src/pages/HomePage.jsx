import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import Products from '../components/products/Products'
import { PRODUCTS_QUERY } from '../graphql/queries/products/allProducts.query'
import { useContextApp } from '../context/AppContext'

const HomePage = () => {
  const {
    contextLoading: [, setLoading],
    contextError: [, setErrors]
  } = useContextApp()

  const [products, setProducts] = useState([])

  const { loading, refetch } = useQuery(PRODUCTS_QUERY, {
    onCompleted: data => {
      setProducts(data.products.nodes)
      setErrors(null)
    },
    onError: ({ graphQLErrors }) => {
      setErrors([graphQLErrors[0], refetch])
    }
  })

  useEffect(() => {    
    setLoading(loading)
  }, [loading, setLoading])

  return (
    !loading &&
    <div>
      <Products products={products} />
    </div>
  )
}

export default HomePage
