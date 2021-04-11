import React from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import PaypalExpressBtn from "react-paypal-express-checkout"
import { Button, Card, Col, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { INITIAL_CHECKOUT, useContextApp } from '../../context/AppContext'
import { checkoutInput } from '../../graphql/inputs/checkout.input'
import { CHECKOUT_MUTATION } from '../../graphql/mutations/checkout/checkout.mutation'
import { productPriceWithComma, productRawPrice, replacePriceWithComma } from '../../utils/product.util'
import PromoForm from '../forms/PromoForm'
import { EMPTY_CART_MUTATION } from '../../graphql/mutations/cart/emptyCart.mutation'
import { GET_CART_QUERY } from '../../graphql/queries/cart/getCart.query'
import { emptyCartInput } from '../../graphql/inputs/cart.input'
import SuccessPaymentModal from '../modal/SuccessPaymentModal'
import FailedPaymentModal from '../modal/FailedPaymentModal'
import LoadingPaymentModal from '../modal/LoadingPaymentModal'
import { DELETE_ORDER_MUTATION } from '../../graphql/mutations/order/deleteOrder.mutation'
import { deleteOrderInput } from '../../graphql/inputs/order.input'

const CartLeftPanel = () => {
    const { t } = useTranslation()
    const elements = useElements()
    const stripe = useStripe()
    const {
        contextCheckout: [{ cart, payment, shipping, billing, isBillingSameAsShipping }, updateCheckout],
        contextAuth: [{ isLogged, isGuest, isGuestEdited, user, guest }, {updateAuth}],
        contextModal: [, setModal],
    } = useContextApp()
    
    const chosenShippingMethod = cart?.availableShippingMethods[0].rates.find(method => method.id === cart?.chosenShippingMethod)
    
    const { refetch } = useQuery(GET_CART_QUERY, {
        notifyOnNetworkStatusChange: true,
        onCompleted: ({ cart }) => {
            updateCheckout({ cart })
        },
        onError: ({ graphQLErrors }) => {
            // setErrors([graphQLErrors[0], refetch])
        }
    })
    const [emptyCart] = useMutation(EMPTY_CART_MUTATION, {
        variables: {
            input: emptyCartInput()
        },
        onCompleted: () => {
            refetch()
        },
        onError: (error) => {
            if (error) {
                console.log(error);
                // setRequestError(error.graphQLErrors[0].message);
            }
        }
    })
    const [checkout] = useMutation(CHECKOUT_MUTATION, {
        onCompleted: ({ checkout }) => {
            handleModal(checkout.result, checkout.order)
        },
        onError: error => {
            console.log(error)
        }
    })

    const [deleteOrder] = useMutation(DELETE_ORDER_MUTATION, {
        onError: err => {
            console.log(err)
        }
    })

    const stripeCheckout = async () => {
        try {
            if (stripe && elements) {
                const cardElement = elements.getElement(CardElement)
                const { error, source } = await stripe.createSource(cardElement, {
                    type: "card",
                    currency: "eur",
                })
                if (error) {
                    console.log(error)
                } else {
                    checkout({
                        variables: {
                            input: checkoutInput({
                                paymentMethod: payment.id,
                                shipToDifferentAddress: isBillingSameAsShipping,
                                shipping: { ...shipping, email: guest.email },
                                billing: isBillingSameAsShipping ? { ...shipping, email: guest.email } : { ...billing, email: guest.email },
                                shippingMethod: [cart.chosenShippingMethod.id],
                                source
                            })
                        }
                    })
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const paypalPayment = payment => {
        handleModal("loading")
        checkout({
            variables: {
                input: checkoutInput({
                    isPaid: true,
                    transactionId: payment.paymentID,
                    paymentMethod: "paypal",
                    shipToDifferentAddress: isBillingSameAsShipping,
                    shipping: { ...shipping, email: guest.email },
                    billing: isBillingSameAsShipping ? { ...shipping, email: guest.email } : { ...billing, email: guest.email },
                    shippingMethod: [cart.chosenShippingMethod.id],
                })
            }
        })
    }

    const handleModal = (status, order = null) => {
        switch (status) {
            case "loading":
                stripeCheckout()
                setModal({
                    title: "Paiement en cours ...",
                    static: true,
                    body: ({ handleClose }) => <LoadingPaymentModal handleClose={handleClose} />
                })
                break
            case "success":
                emptyCart()
                if (guest && isGuest) {
                    updateAuth({
                        isGuest: false,
                        guest: null,
                        isGuestEdited: true,
                    })
                    updateCheckout(INITIAL_CHECKOUT)
                }
                setModal({
                    title: "Confirmation de paiement",
                    static: true,
                    body: ({ handleClose }) => <SuccessPaymentModal handleClose={handleClose} />
                })
                break
            case "fail":
                if (order) {
                    deleteOrder({
                        variables: {
                            input: deleteOrderInput({
                                id: order.id,
                                orderId: order.orderId
                            })
                        }
                    })
                }
                setModal({
                    title: "Paiement échoué",
                    body: ({ handleClose }) => <FailedPaymentModal handleClose={handleClose} />
                })
                break
            default:
                setModal({
                    title: "Une erreur s'est produite",
                    body: () => <p>{t("actions.modal.payment.error")}</p>,
                })
        }
    }

    const handleError = err => {
        console.log(err)
        handleModal("fail")
    }

    const isEverythingOkay = () => !isGuestEdited && (isLogged || isGuest) && (!!user || !!guest) && !!shipping

    // console.log(isEverythingOkay())
    // console.log(isGuestEdited)

    return (
        <Card as="aside" className="left-panel">
            <Card.Title className={`text-center`} as="h2">
                {t("cart.header")}
            </Card.Title>
            <Card.Body>
                <Row>
                    <Col>{t("cart.totalProducts")}</Col>
                    <Col>{cart?.contents.nodes.length}</Col>
                </Row>
                <Row>
                    <Col>{t("cart.totalProductsPrice")}</Col>
                    <Col>{cart && productPriceWithComma(cart.subtotal)} €</Col>
                </Row>
                <hr />
                <Row>
                    <Col>{t("cart.accordion.shippingMethods.choice")}</Col>
                    <Col>
                        <i>
                            {t(`entrust.shipping.${chosenShippingMethod?.label}`)}
                        </i>
                    </Col>
                </Row>
                <Row>
                    <Col>{t("cart.accordion.shippingMethods.fees")}</Col>
                    <Col>{chosenShippingMethod && replacePriceWithComma(chosenShippingMethod.cost)} €</Col>
                </Row>
                {
                    shipping &&
                    <>
                        <hr />
                        <Row>
                            <Col>
                                <span>{t(`checkout.address.${isBillingSameAsShipping && !billing ? "bothSame" : "bothDiff"}`)}</span>
                            </Col>
                        </Row>
                    </>
                }
                <hr />
                <Row>
                    <Col>{t("cart.accordion.paymentMethods.label")}</Col>
                    <Col>
                        <u className="text-capitalize">
                            {t(`entrust.${payment?.id}`)}
                        </u>
                        {
                            payment.id === "stripe" &&
                            payment?.owner &&
                            payment?.isComplete &&
                            payment?.cardBrand &&
                            <small className="ml-1 text-capitalize">{`(${payment.cardBrand})`}</small>
                        }
                    </Col>
                </Row>
                {
                    isGuest && guest &&
                    <>
                        <hr />
                        <Row>
                            <Col className="d-flex flex-column">
                                <small>{t("checkout.guest.text")}</small>
                                <small className="text-info">{t("checkout.guest.warning.title")}</small>
                                <ul className="pl-2 small-text text-info">
                                    {
                                        t("checkout.guest.warning.list").split("/ ").map((value, i) => (
                                            <li key={i}>{value}</li>
                                        ))
                                    }
                                </ul>
                            </Col>
                        </Row>
                    </>
                }
                {
                    isLogged && user &&
                    <>
                        <hr />
                        <Row>
                            <Col className="d-flex flex-column">
                                <small>{t("checkout.user.text")}</small>
                                <small className="text-info">{t("checkout.user.warning.title")}</small>
                            </Col>
                        </Row>
                    </>
                }
                {
                    (isGuest || isLogged) &&
                    <>
                        <hr />
                        <Row>
                            <Col>
                                <PromoForm />
                            </Col>
                        </Row>
                    </>
                }
            </Card.Body>
            <Card.Footer>
                <Row>
                    <Col>{t("cart.totalCart")}</Col>
                    <Col>{cart && productPriceWithComma(cart.total)} €</Col>
                </Row>
                <Row className={`mt-3`}>
                    <Col>
                        {
                            payment?.id === "paypal" && isEverythingOkay() ? (
                                <PaypalExpressBtn
                                    env="sandbox"
                                    client={{
                                        sandbox: "AeUSjGLmKrqD8AoBuL_fSjzBi9imy302gy4NwUw1MmJVF6o5UXObwXVcSOPMZ95l7ORPa-jR2drlDw-X",
                                        production: ""
                                    }}
                                    currency="EUR"
                                    total={productRawPrice(cart?.total)}
                                    onSuccess={paypalPayment}
                                    onError={handleError}
                                    style={{
                                        size: "responsive",
                                        label: "paypal",
                                        tagline: false
                                    }}
                                />

                            ) : (
                                <Button
                                    disabled={!isEverythingOkay()}
                                    variant={isEverythingOkay() ? "primary" : "dark"}
                                    className={`p-4`}
                                    onClick={() => handleModal("loading")}
                                    block
                                >
                                    <span>{t("cart.confirmPayment")}</span>
                                </Button>
                            )
                        }
                        {
                            !isEverythingOkay() &&
                            <section className="mt-2 d-flex flex-column">
                                <small className="small-text text-danger">
                                    <strong>{t("checkout.errors.title")}</strong>
                                </small>
                                {
                                    (!shipping || (shipping && !isBillingSameAsShipping && !billing)) &&
                                    <div>
                                        <FontAwesomeIcon className="small-text" color="red" icon={faTimes} />
                                        <small className="small-text text-danger ml-2">{t("checkout.errors.noShipping")}</small>
                                    </div>
                                }
                                {
                                    !isLogged && !user && !isGuest && !guest &&
                                    <div className="small-text">
                                        <FontAwesomeIcon color="red" icon={faTimes} />
                                        <span className="text-danger ml-2">{t("checkout.errors.notLogged")}</span>
                                    </div>
                                }
                                {
                                    isGuestEdited && isGuest &&
                                    <div className="small-text">
                                        <FontAwesomeIcon color="red" icon={faTimes} />
                                        <span className="text-danger ml-2">{t("checkout.errors.guestEditing")}</span>
                                    </div>
                                }
                            </section>
                        }
                    </Col>
                </Row>
            </Card.Footer>
        </Card >
    )
}

export default CartLeftPanel
