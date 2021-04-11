import React from 'react'
import { NavLink } from "react-router-dom"
import { Card, Col, Container, Jumbotron, Row } from 'react-bootstrap'
import CartResumeAccordion from '../accordion/CartResumeAccordion'
import { useTranslation } from 'react-i18next'
import AccordionContainer from "../accordion/AccordionContainer"
import ShippingMethodsAccordion from '../accordion/ShippingMethodsAccordion'
import PaymentMethodsAccordion from '../accordion/PaymentMethodsAccordion'
import IdentityAccordion from '../accordion/IdentityAccordion'
import "./Cart.css"
import CartLeftPanel from './CartLeftPanel'
import { useContextApp } from '../../context/AppContext'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

const Cart = () => {
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
  const { t } = useTranslation()
  const {
    contextCheckout: [{ cart }]
  } = useContextApp()

  return !cart || cart?.isEmpty ?
      <Jumbotron className={`jumbo mt-4 mx-auto border`}>
        <h3>
          {t("cart.empty.title")}
        </h3>
        <p>
          {t("cart.empty.text")}
        </p>
        <NavLink to="/" className={`btn btn-primary`}>{t("cart.empty.link")}</NavLink>
      </Jumbotron>
    :
    <Elements stripe={stripePromise}>
      <Container className="px-0">
        <Card>
          <Card.Header>
            <h1 className="text-center">{t("cart.title")}</h1>
          </Card.Header>
        </Card>
        <Row className={`position-relative my-4`}>
          <Col className="" md={4}>
            <CartLeftPanel />
          </Col>
          <Col md={8}>
            <Row>
              <Col>
                <AccordionContainer defaultActiveKey="1">
                  <CartResumeAccordion items={cart?.contents.nodes} />
                  <ShippingMethodsAccordion
                    shippingMethods={cart?.availableShippingMethods[0].rates}
                    chosenShippingMethod={cart?.chosenShippingMethod}
                  />
                  <PaymentMethodsAccordion />
                  <IdentityAccordion />
                </AccordionContainer>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Elements>
}

export default Cart