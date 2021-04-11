import React from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Col, Image, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import { useContextApp } from '../../context/AppContext'
import { UPDATE_QUANTITY_MUTATION } from '../../graphql/mutations/cart/updateItemsQuantities.mutation'
import { productPriceWithComma, replacePriceWithComma } from '../../utils/product.util'
import { removeItemsFromCartInput, updateItemQuantitiesInput } from "../../graphql/inputs/cart.input"
import { REMOVE_ITEM_FROM_CART } from '../../graphql/mutations/cart/removeItemsFromCart.mutation'
import { GET_CART_QUERY } from '../../graphql/queries/cart/getCart.query'

const CartItem = ({ item }) => {
    const {
        contextCheckout: [, updateCheckout],
        contextToast: [, setToast],
        contextModal: [, setModal],
        contextError: [, setErrors]
    } = useContextApp()
    const { pathname } = useLocation()
    const {t} = useTranslation()

    // Get Cart Data.
    const { refetch } = useQuery(GET_CART_QUERY, {
        notifyOnNetworkStatusChange: true,
        onCompleted: data => {
            updateCheckout({cart: data.cart})
        },
        onError: ({ graphQLErrors }) => {
            console.log("graphQLErrors", graphQLErrors[0])
            setErrors([graphQLErrors[0], refetch])
        }
    })

    // Update Item in Cart Mutation.
    const [updateItemQuantities] = useMutation(UPDATE_QUANTITY_MUTATION, {
        onCompleted: () => {
            // On Success: Make the GET_CART query to update the cart with new values in React context.
            refetch()
            setToast({
                title: "Notification",
                body: t("actions.toast.success.cart.updateQuantity"),
                role: "secondary",
                delay: 2000
            })
        },
        onError: (error) => {
            if (error) {
                console.log(error);
                // setRequestError(error.graphQLErrors[0].message);
            }
        }
    })

    // Remove Item from Cart Mutation
    const [removeItemsFromCart] = useMutation(REMOVE_ITEM_FROM_CART, {
        variables: {
            input: removeItemsFromCartInput({productKeys: [item.key]})
        },
        onCompleted: (data) => {
            refetch()
            setToast({
                title: "Notification",
                body: t("actions.toast.success.cart.removeItem"),
                role: "danger"
            })
        },
        onError: (error) => {
            if (error) {
                console.log(error);
                // setRequestError(error.graphQLErrors[0].message);
            }
        }
    })

    const handleQuantity = method => {
        let newQuantity = method === "dec" ? item.quantity-1 : item.quantity+1
        updateItemQuantities({
            variables: {
                input: updateItemQuantitiesInput(item.key, newQuantity)
            }
        })
    }

    const showModal = () => {
        setModal({
            dismiss: t("actions.button.cancel"),
            title: t("actions.modal.cart.removeItem.title"),
            body: () => <p>{t("actions.modal.cart.removeItem.body")}</p>,
            action: {
                method: removeItemsFromCart,
                text: t("actions.button.remove"),
                role: "danger"
            }
        })
    }

  return (
    <Row className="align-items-center border-bottom pb-3">
        <Col className="text-center">
            <Link to={`${pathname.length > 1 ? pathname : ""}/${item.product.slug}`}>
                <Image
                    src={item.product.image.sourceUrl}
                    alt={item.product.image.altText}
                    height={100}
                />
            </Link>
        </Col>
        <Col>
            <Row>
                <Link to={`${pathname.length > 1 ? pathname : ""}/${item.product.slug}`}>
                    <span>{item.product.name}</span>
                </Link>
            </Row>
            <Row>
                <strong>{t("products.variant")}: {item.variation.attributes.nodes[0].value}</strong>
            </Row>
            <Row>
                <span>{t("products.unitPrice")}: {productPriceWithComma(item.variation.price)} €</span>
            </Row>
            <Row>
                <Button
                    variant="outline-secondary"
                    onClick={showModal}
                >
                    <FontAwesomeIcon icon={faTrash} />
                    <span className="ml-2">{t("actions.button.delete")}</span>
                </Button>
            </Row>
        </Col>
        <Col xs={3}>
            <Button disabled={item.quantity === 1} variant="dark" size={`sm`} onClick={() => handleQuantity("dec")}>-</Button>
            <span className={`px-3`}>{item.quantity}</span>
            <Button disabled={item.quantity >= item.variation.stockQuantity / 5} variant="dark" size={`sm`} onClick={() => handleQuantity("inc")}>+</Button>
        </Col>
        <Col xs={2} className="font-weight-bold">{replacePriceWithComma(item.total)} €</Col>
    </Row>
  )
}

export default CartItem
