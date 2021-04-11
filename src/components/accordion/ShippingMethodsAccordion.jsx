import { useMutation, useQuery } from '@apollo/client'
import React from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useContextApp } from '../../context/AppContext'
import { updateShippingMethodInput } from '../../graphql/inputs/shipping.input'
import { UPDATE_SHIPPING_METHOD } from '../../graphql/mutations/shipping-methods/updateShippingMethod'
import { GET_CART_QUERY } from '../../graphql/queries/cart/getCart.query'
import AddressText from '../address/AddressText'
import AddressForm from '../forms/AddressForm'
import AccordionItem from './AccordionItem'
import "./Accordion.css"

const ShippingMethodsAccordion = ({ shippingMethods, chosenShippingMethod, index, activeIndex, setActiveIndex }) => {    
    const {
        contextModal: [, setModal],
        contextCheckout: [{shipping, billing, isBillingSameAsShipping}, updateCheckout]
    } = useContextApp()
    
    const { t } = useTranslation()

    // Get Cart Data.
    const { data, refetch } = useQuery(GET_CART_QUERY, {
        notifyOnNetworkStatusChange: true,
        onCompleted: () => {
            updateCheckout({cart: data?.cart})
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const [updateShippingMethod] = useMutation(UPDATE_SHIPPING_METHOD, {
        onCompleted: () => {
            refetch()
        },
        onError: error => {
            console.log(error)
        }
    })

    const handleSelect = e => {
        updateShippingMethod({
            variables: {
                input: updateShippingMethodInput([e.target.value])
            }
        })
    }

    const handleModal = () => {
        setModal({
            dismiss: t("actions.button.cancel"),
            title: t("actions.modal.address.add.title"),
            body: ({ handleClose }) => <AddressForm handleClose={handleClose} />,
            size: "xl"
        })
    }
    
    return (
        <AccordionItem
            title={`2. ${t("cart.accordion.shippingMethods.label")}`}
            subtitle={t("cart.accordion.shippingMethods.subtitle")}
            activeIndex={activeIndex}
            index={index}
            setActiveIndex={setActiveIndex}
        >
            <Card.Body>
                <Row>
                    <Col xs={5}>
                        {
                            shippingMethods.map(method => (
                                <Form.Check
                                    type="radio"
                                    id={method.id}
                                    name="shippingMethod"
                                    key={method.id}
                                    value={method.id}
                                    checked={method.id === chosenShippingMethod}
                                    onChange={handleSelect}
                                    label={t(`cart.accordion.shippingMethods.methods.${method.label}`)}
                                />
                            ))
                        }
                    </Col>
                    <Col xs={7}>
                    {
                        shipping ?
                        <>
                            <AddressText handleModal={handleModal} address={shipping} title={isBillingSameAsShipping ? t("address.bothSame") : t("address.shipping")} />
                            {
                                billing && !isBillingSameAsShipping &&
                                <>
                                    <hr />
                                    <AddressText handleModal={handleModal} address={billing} title={t("address.billing")} />
                                </>
                            }
                        </>
                        :
                        <div className="p-3 bg-light">
                            <div>{t("address.nothing.text")}</div>
                            <Button className="mt-2" onClick={handleModal}>{t("address.nothing.btn")}</Button>
                        </div>
                    }
                    </Col>
                </Row>
            </Card.Body>
        </AccordionItem>
    )
}

export default ShippingMethodsAccordion
