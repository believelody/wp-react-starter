import React, { useState } from 'react'
import { Button, Col, Form, ListGroup } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { maxQuantity } from '../../utils/product.util'

const ProductVariant = ({ quantity, setQuantity, variationId, setVariationId, product }) => {
    const {t} = useTranslation()
    const [error, setError] = useState(null)
    
    const handleChange = e => {
        if (+e.target.value >= maxQuantity(product)) {
            setError({overMaxQuantity: t("products.error.overMaxQuantity", {maxQuantity: maxQuantity(product)})})
        }
        else setQuantity(e.target.value >= 1 ? (+e.target.value) : 0)
    }

  return (
    <>
        <Col xs={12} md={5}>
            <Form.Group>
                <Form.Label>{t("products.quantity")}:</Form.Label>
                <div className="row align-items-center justify-content-end">
                    <Button className="col-2" disabled={quantity === 1} variant="dark" size={`sm`} onClick={() => setQuantity(prevQuantity => prevQuantity - 1)}>-</Button>
                    <Form.Control
                        type="tel"
                        size="sm"
                        className="col-6 mx-2"
                        value={quantity}
                        onChange={e => handleChange(e)}
                        onBlur={() => setError(null)}
                    />
                    <Button className="col-2" disabled={quantity >= maxQuantity(product)} variant="dark" size={`sm`} onClick={() => setQuantity(prevQuantity => prevQuantity + 1)}>+</Button>
                </div>
                {
                    error?.overMaxQuantity &&
                    <Form.Text className="text-danger">
                        {error?.overMaxQuantity}
                    </Form.Text>
                }
            </Form.Group>
        </Col>
        <Col xs={12} md={7}>
            <Form.Group>
                <Form.Label>{t("products.variant")} :</Form.Label>
                <ListGroup horizontal>
                    {
                        [...product.variations.nodes]
                        .sort((a, b) => a.variationId > b.variationId)
                        .map(variation => (
                            <ListGroup.Item
                                key={variation.variationId}
                                className="text-center"
                                variant={variationId === variation.variationId ? "success" : undefined}
                                onClick={() => setVariationId(variation.variationId)}
                                action
                            >
                                {variation.attributes.nodes[0].value}
                            </ListGroup.Item>
                        ))
                    }
                </ListGroup>
                {/* <Form.Control as="select" onChange={e => setVariationId(+e.target.value)}>
                    <option value={0} selected={!variationId} />
                    {
                        product.variations.nodes
                        .sort((a, b) => a.variationId > b.variationId)
                        .map(variation => (
                            <option
                                key={variation.variationId}
                                selected={variationId === variation.variationId}
                                value={variation.variationId}>
                                {variation.attributes.nodes[0].value}
                            </option>
                        ))
                    }
                </Form.Control> */}
            </Form.Group>
        </Col>
    </>
  )
}

export default ProductVariant
