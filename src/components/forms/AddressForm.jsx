import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useContextApp } from '../../context/AppContext'

const AddressForm = ({ handleClose }) => {
    const {t} = useTranslation()
    const { contextCheckout: [{ shipping, billing }, updateCheckout] } = useContextApp()
    const [shippingAddress, setShippingAddress] = useState(shipping || {address1: "", address2: "", city: "", postcode: "", country: ""})
    const [billingAddress, setBillingAddress] = useState(billing || {address1: "", address2: "", city: "", postcode: "", country: ""})
    const [isBillingSameAsShipping, setIsBillingSameAsShipping] = useState(!billing)

    const handleShippingAddressChange = (e) => {
        let { name, value } = e.target
        if (name === "postcode" && !value.match(/^[0-9]*$/g)) {
            setShippingAddress(prevState => ({ ...prevState, postcode: shippingAddress.postcode }))
            return
        }
        setShippingAddress(prevState => ({ ...prevState, [name]: value }))
    }

    const handleBillingAddressChange = (e) => {
        let { name, value } = e.target
        if (name === "postcode" && !value.match(/\d+/g)) {
            setBillingAddress(prevState => ({ ...prevState, postcode: billingAddress.postcode }))
            return
        }
        setBillingAddress(prevState => ({ ...prevState, [name]: value }))
    }

    const handleAddAddress = () => {
        updateCheckout({
            isBillingSameAsShipping,
            shipping: shippingAddress,
            billing: isBillingSameAsShipping ? null : billingAddress
        })
        setShippingAddress(null)
        setBillingAddress(null)
        setIsBillingSameAsShipping(true)
        if (handleClose) handleClose()
    }

    const handleReset = () => {
        setShippingAddress(null)
        setBillingAddress(null)
        setIsBillingSameAsShipping(true)
    }

    const isFieldValid = () => {
        if (isBillingSameAsShipping) {
            return Object.entries(shippingAddress).filter(([k, v]) => k !== "address2").every(([k, v]) => v)
        }
        else {
            return Object.entries(shippingAddress).filter(([k, v]) => k !== "address2").every(([k, v]) => v)
                && Object.entries(billingAddress).filter(([k, v]) => k !== "address2").every(([k, v]) => v)

        }
    }

  return (
    <Container>
        <Form onSubmit={handleAddAddress}>
            <Row className="justify-content-between">
                <Col>
                    <h4>{t("address.shipping")}</h4>
                </Col>
                <Col className="text-right">
                    <Button
                        disabled={!isFieldValid()}
                          variant={`${isFieldValid() ? "primary" : "dark"}`}
                        type="submit"
                    >
                        {t("actions.button.confirm")}
                    </Button>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <Form.Check
                        type="checkbox"
                        value={isBillingSameAsShipping}
                        checked={isBillingSameAsShipping}
                        onChange={() => setIsBillingSameAsShipping(prevState => !prevState)}
                        label={t("actions.modal.address.isBillingSameAsShipping")}
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={6}>
                    <Form.Group>
                        <Form.Label>{t("address.address1")}</Form.Label>
                        <Form.Control
                            name="address1"
                            value={shippingAddress?.address1 || ""}
                            onChange={handleShippingAddressChange}
                        />
                    </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                    <Form.Group>
                        <Form.Label>{t("address.address2")}</Form.Label>
                        <Form.Control
                            name="address2"
                            value={shippingAddress?.address2 || ""}
                            onChange={handleShippingAddressChange}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col xs={8} md={6}>
                    <Form.Group>
                        <Form.Label>{t("address.city")}</Form.Label>
                        <Form.Control
                            name="city"
                            value={shippingAddress?.city || ""}
                            onChange={handleShippingAddressChange}
                        />
                    </Form.Group>
                </Col>
                <Col xs={4} md={2}>
                    <Form.Group>
                        <Form.Label>{t("address.postcode")}</Form.Label>
                        <Form.Control
                            name="postcode"
                            value={shippingAddress?.postcode || ""}
                            onChange={handleShippingAddressChange}
                        />
                    </Form.Group>
                </Col>
                <Col xs={12} md={4}>
                    <Form.Group>
                        <Form.Label>{t("address.country")}</Form.Label>
                        <Form.Control
                            name="country"
                            value={shippingAddress?.country || ""}
                            onChange={handleShippingAddressChange}
                        />
                    </Form.Group>
                </Col>
            </Row>
            {
                !isBillingSameAsShipping &&
                <>
                    <hr />
                    <h4>{t("address.billing")}</h4>
                    <Row>
                        <Col xs={12} md={6}>
                            <Form.Group>
                                <Form.Label>{t("address.address1")}</Form.Label>
                                <Form.Control
                                    name="address1"
                                    value={billingAddress?.address1 || ""}
                                    onChange={handleBillingAddressChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6}>
                            <Form.Group>
                                <Form.Label>{t("address.address2")}</Form.Label>
                                <Form.Control
                                    name="address2"
                                    value={billingAddress?.address2 || ""}
                                    onChange={handleBillingAddressChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={8} md={4}>
                            <Form.Group>
                                <Form.Label>{t("address.city")}</Form.Label>
                                <Form.Control
                                    name="city"
                                    value={billingAddress?.city || ""}
                                    onChange={handleBillingAddressChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={4} md={2}>
                            <Form.Group>
                                <Form.Label>{t("address.postcode")}</Form.Label>
                                <Form.Control
                                    name="postcode"
                                    value={billingAddress?.postcode || ""}
                                    onChange={handleBillingAddressChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={4}>
                            <Form.Group>
                                <Form.Label>{t("address.country")}</Form.Label>
                                <Form.Control
                                    name="country"
                                    value={billingAddress?.country || ""}
                                    onChange={handleBillingAddressChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </>
            }
            <Row>
                <Col className="text-right">
                    <Button
                        variant="outline-danger"
                        onClick={handleReset}
                    >
                        Reset
                    </Button>
                </Col>
            </Row>
        </Form>
    </Container>
  )
}

export default AddressForm
