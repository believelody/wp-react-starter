import React from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useContextApp } from "../../context/AppContext"
import { checkProductInCart } from "../../utils/cart.util"
import { maxQuantity } from '../../utils/product.util'
import { ADD_TO_CART_MUTATION } from '../../graphql/mutations/cart/addToCart.mutation'
import { productQueryInput } from "../../graphql/inputs/product.input"
import { GET_CART_QUERY } from '../../graphql/queries/cart/getCart.query'

const AddToCartBtn = ({ product, variationId, quantity, setQuantity, setVariationId }) => {
    const {
        contextCheckout: [{cart}, updateCheckout],
        contextToast: [, setToast]
    } = useContextApp()

    const {t} = useTranslation()

    const updateBtnColor = () => {
        if (variationId) {
            if (addToCartLoading) {
                return "info"
            }
            let isProductFound = checkProductInCart(cart?.contents.nodes, product.productId, variationId)
            return isProductFound ? "primary" : "success"
        }
        return "dark"
    }

    const updateBtnText = () => {
        if (addToCartLoading) {
            return t("products.single.addingToCart")
        }
        if (variationId) {
            let isProductFound = checkProductInCart(cart?.contents.nodes, product.productId, variationId)
            return isProductFound ? t("products.single.updateProduct") : t("products.single.addToCart")
        }
        return t("products.single.chooseVariation")
    }

    // Get Cart Data.
    const { loading: getCartQueryLoading, refetch } = useQuery(GET_CART_QUERY, {
        notifyOnNetworkStatusChange: true,
        onCompleted: data => {
            updateCheckout({cart: data?.cart})
        },
        onError: (error) => {
            console.log(error)
        }
    })

    // Add to Cart Mutation.
    const [addToCart, { loading: addToCartLoading, error: addToCartError }] = useMutation(ADD_TO_CART_MUTATION, {
        variables: {
            input: productQueryInput(product.productId, quantity, variationId),
        },
        onCompleted: () => {
            if (addToCartError) {
                console.log(addToCartError);
            }
            refetch({
                input: productQueryInput(product.productId, quantity, variationId)
            })
            handleToast()
        },
        onError: (error) => {
            if (error) {
                console.log(error);
            }
        }
    });

    const handleToast = () => {
        const isProductFound = checkProductInCart(cart?.contents.nodes, product.productId, variationId)
        if (isProductFound) {
            setToast({
                title: "Notification",
                body: t(`actions.toast.success.product.updated`, { name: product.name }),
                role: "success",
                target: "cart"
            })
        }
        else {
            let selectVariation = product.variations.nodes.find(variation => variation.variationId === variationId)
            setToast({
                title: "Notification",
                body: t(`actions.toast.success.product.added`, { name: `${product.name}-${selectVariation.attributes.nodes[0].value}` }),
                role: "success",
                target: "cart"
            })
        }
        setQuantity(1)
        setVariationId(0)
    }

    const isBtnDisabled = () => !variationId || quantity === 0 || quantity >= maxQuantity(product) || addToCartError || getCartQueryLoading

  return (
      <>
        <Button
            disabled={isBtnDisabled()}
            variant={updateBtnColor()}
            onClick={addToCart}
            className="text-uppercase py-3"
            block
        >
              {updateBtnText()}
        </Button>
      </>
  )
}

export default AddToCartBtn