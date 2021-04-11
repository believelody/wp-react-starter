import React from 'react'
import { Button, Col, Dropdown, Form, Row } from 'react-bootstrap'
import { faCreditCard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ProductVariant from '../products/ProductVariant'
import i18n from '../../translation/i18n'

const DropdownQuickBuy = ({ quantity, variationId, setQuantity, setVariationId, product }) => {
  return (
    <Dropdown>
        <Dropdown.Toggle variant="success">{i18n.t("products.item.quickBuy")}</Dropdown.Toggle>
        <Form>
        <Dropdown.Menu className="px-3 dropdown-size">
            <Row>
                <ProductVariant
                    quantity={quantity}
                    variationId={variationId}
                    setQuantity={setQuantity}
                    setVariationId={setVariationId}
                    product={product}
                />
            </Row>
            <Row>
                <Col>
                <Form.Group>
                    <Button
                        variant={!quantity || !variationId ? "dark" : "info"}
                        disabled={!quantity || !variationId}
                        block
                    >
                        <FontAwesomeIcon icon={faCreditCard} />
                        <span className="ml-2">{i18n.t("products.item.instantPay")}</span>
                    </Button>
                </Form.Group>
                </Col>
            </Row>
        </Dropdown.Menu>
        </Form>
    </Dropdown>
  )
}

export default DropdownQuickBuy
