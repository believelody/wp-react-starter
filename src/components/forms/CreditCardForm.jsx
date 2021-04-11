import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Col, Form, Row } from 'react-bootstrap';
import { CardElement } from '@stripe/react-stripe-js';
import { useContextApp } from '../../context/AppContext';

const CreditCardForm = () => {
    const { t } = useTranslation()
    const { contextCheckout: [{ payment }, updateCheckout] } = useContextApp()
    // const [ownerName, setOwnerName] = useState("")
    // const [cardInfo, setCardInfo] = useState(null)
    const [error, setError] = useState(null)

    // const handleNameChange = e => {
    //     let {value} = e.target
    //     if (value) {
    //         setError(prevState => ({
    //             ...prevState,
    //             ownerName: null
    //         }))
    //     }
    //     updateCheckout({
    //         payment: {
    //             ...payment,
    //             owner: value
    //         }
    //     })
    // }

    const handleCardChange = event => {
        console.log(event);
        if (event.error) {
            setError(prevState => ({
                ...prevState,
                card: t(`cart.accordion.paymentMethods.stripe.error.${event.error.code}`)
            }))
        }
        else {
            setError(prevState => ({
                ...prevState,
                card: null
            }))
            updateCheckout({
                payment: {
                    ...payment,
                    isComplete: event.complete,
                    cardBrand: event.brand
                }
            })
        }
    }

    // const handleError = () => {
    //     if (!payment?.owner) {
    //         setError(prevState => ({ ...prevState, ownerName: t("cart.accordion.paymentMethods.stripe.error.name") }))
    //     }
    // }

    return (
        <>
            {/* <Row>
            <Col>
                <Form.Control
                    name="ownerName"
                    value={payment?.owner || ""}
                    onChange={handleNameChange}
                    placeholder={t("cart.accordion.paymentMethods.stripe.name")}
                    isInvalid={error?.ownerName}
                    onBlur={handleError}
                    className="p-2 bg-light"
                />
                <Form.Control.Feedback type="invalid">
                    {error?.ownerName}
                </Form.Control.Feedback>
            </Col>
        </Row> */}
            <Row className="">
                <Col>
                    <CardElement options={{ hidePostalCode: true }} onChange={handleCardChange} />
                    {error?.card && <small className="text-danger">{error?.card}</small>}
                </Col>
            </Row>
        </>
    )
}

export default CreditCardForm
