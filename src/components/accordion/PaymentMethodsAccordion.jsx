import React from 'react'
import { useQuery } from '@apollo/client'
import { faPaypal } from '@fortawesome/free-brands-svg-icons'
import { faCreditCard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card, Col, Form, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { PAYMENT_METHODS_QUERY } from '../../graphql/queries/cart/paymentMethods.query'
import { useContextApp } from '../../context/AppContext'
import AccordionItem from './AccordionItem'
import 'react-credit-cards/es/styles-compiled.css'
import CreditCardForm from '../forms/CreditCardForm'

const iconPayment = name => {
    switch (name) {
        case "stripe":
            return <FontAwesomeIcon icon={faCreditCard} />
        case "paypal":
            return <FontAwesomeIcon icon={faPaypal} />
        default:
            return null
    }
}

const PaymentMethodsAccordion = ({ index, activeIndex, setActiveIndex }) => {
    const { t } = useTranslation()
    const { contextCheckout: [{ payment }, updateCheckout] } = useContextApp()

    const { data } = useQuery(PAYMENT_METHODS_QUERY, {
        onError: error => console.log(error)
    })
    const paymentMethods = data?.paymentGateways?.nodes || []

    const handleSelectPaymentMethod = e => {
        updateCheckout({payment: {id: e.target.value}})
    }
    
    return (
        <AccordionItem
            title={`3. ${t("cart.accordion.paymentMethods.label")}`}
            subtitle={t("cart.accordion.paymentMethods.subtitle")}
            activeIndex={activeIndex}
            index={index}
            setActiveIndex={setActiveIndex}
        >
            <Card.Body>
                <Row className="align-items-start">
                    <Col xs={6}>
                    {
                        paymentMethods.map(method => (
                            <Form.Check
                                type="radio"
                                id={method.id}
                                name="paymentMethod"
                                key={method.id}
                                value={method.id}
                                checked={method.id === payment?.id}
                                onChange={handleSelectPaymentMethod}
                                label={
                                    <div className={`${method.id === payment?.id ? "font-weight-bold text-primary" : ""}`}>
                                        <span className={`mr-4`}>{t(`cart.accordion.paymentMethods.methods.${method.id}`)}</span>
                                        {iconPayment(method.id)}
                                    </div>
                                }
                            />
                        ))
                    }
                    </Col>
                    {
                        payment?.id === "stripe" &&
                        <Col xs={6}>
                            <div className="p-3 border bg-light">
                                <CreditCardForm />
                            </div>
                        </Col>
                    }
                    {
                        payment?.id === "paypal" &&
                        <Col xs={6}>
                            <div className="p-3 border bg-light">
                                <h6>
                                    {t("cart.accordion.paymentMethods.paypal.process")}
                                </h6>
                            </div>
                        </Col>
                    }
                </Row>
            </Card.Body>
        </AccordionItem>
    )
}

export default PaymentMethodsAccordion
