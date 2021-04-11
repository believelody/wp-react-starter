import { useQuery } from '@apollo/client'
import Cart from '../components/cart/Cart'
import React, { useEffect } from 'react'
import PageBg from '../components/page/PageBg'
import { useContextApp } from '../context/AppContext'
import { GET_CART_QUERY } from '../graphql/queries/cart/getCart.query'

const CartPage = () => {
  const {
    contextCheckout: [, updateCheckout],
    contextError: [, setErrors],
    contextLoading: [, setLoading]
  } = useContextApp()

  const { loading, refetch } = useQuery(GET_CART_QUERY, {
    onCompleted: data => {
      setErrors(null)
      updateCheckout({ cart: data.cart })

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
    <PageBg bgUrl="/images/weliftup-cart-kelly-sikkema-min.jpg">
      <Cart />
    </PageBg>
  )
}

export default CartPage
