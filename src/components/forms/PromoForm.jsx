import { useMutation, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { Button, Form, InputGroup, Spinner } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useContextApp } from '../../context/AppContext'
import { applyCouponInput } from '../../graphql/inputs/cart.input'
import { APPLY_COUPON_MUTATION } from '../../graphql/mutations/cart/coupon.mutation'
import { GET_CART_QUERY } from '../../graphql/queries/cart/getCart.query'

const PromoForm = () => {
    const {t} = useTranslation()
    const {
        contextCheckout: [, updateCheckout],
        contextToast: [, setToast],
        contextError: [, setErrors]
    } = useContextApp()
    const [code, setCode] = useState("")

    // Get Cart Data.
    const { refetch } = useQuery(GET_CART_QUERY, {
        notifyOnNetworkStatusChange: true,
        onCompleted: data => {
            updateCheckout({ cart: data?.cart })
        },
        onError: ({ graphQLErrors }) => {
            setErrors([graphQLErrors[0], refetch])
        }
    })

    const [applyCoupon, {loading}] = useMutation(APPLY_COUPON_MUTATION, {
        variables: {
            input: applyCouponInput(code.toLocaleLowerCase())
        },
        onCompleted: data => {
            console.log(data);
            setToast({
                title: "Notification",
                body: t("promo.toast.success"),
                role: "success",
            })
            refetch()
        },
        onError: ({ graphQLErrors }) => {
            console.log(graphQLErrors)
            if (graphQLErrors[0].message.includes("No coupon found")) {
                setToast({
                    title: "Notification",
                    body: t("promo.toast.error.notFound"),
                    role: "danger",
                })
            }
            else if (graphQLErrors[0].message.includes("already been applied")) {
                setToast({
                    title: "Notification",
                    body: t("promo.toast.error.alreadyApplied"),
                    role: "danger",
                })
            }
            else if (graphQLErrors[0].message.includes("not exist")) {
                setToast({
                    title: "Notification",
                    body: t("promo.toast.error.notExist"),
                    role: "danger",
                })
            }
            else if (graphQLErrors[0].message.includes("has expired")) {
                setToast({
                    title: "Notification",
                    body: t("promo.toast.error.expired"),
                    role: "danger",
                })
            }
        }
    })

    const handleSubmit = e => {
        e.preventDefault()
        applyCoupon()
        setCode("")
    }

  return (
    <Form onSubmit={handleSubmit}>
        <InputGroup>
            <Form.Control
                id="promo-code"
                aria-describedby="promo"
                placeholder={t("promo.placeholder")}
                value={code}
                onChange={e => setCode(e.target.value)}
            />
            <InputGroup.Prepend>
                <Button
                    disabled={!code || loading}
                    variant="dark"
                    type="submit"
                >
                    {
                        loading ?
                        <div className="d-flex align-items-center">
                            <span className="mr-3">{t("actions.loading")}</span>
                            <Spinner animation="border" />
                        </div>
                        :
                        <span>
                            {t("actions.button.validate")}
                        </span>

                    }
                </Button>
            </InputGroup.Prepend>
        </InputGroup>
    </Form>
  )
}

export default PromoForm
