import React, { useState } from 'react'
import { faCcPaypal, faDhl, faExpeditedssl, faFedex, faUps, faUsps } from '@fortawesome/free-brands-svg-icons'
import { faBox, faCreditCard, faShieldAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Col, ListGroup, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import AccordionContainer from '../accordion/AccordionContainer'
import ChartSizeAccordion from '../accordion/ChartSizeAccordion'
import DescriptionAccordion from '../accordion/DescriptionAccordion'
import ReviewsAccordion from '../accordion/ReviewsAccordion'
import ProductSingleCarousel from '../carousel/ProductSingleCarousel'
import AddToCartBtn from '../cart/AddToCartBtn'
import Container from '../container/Container'
import ProdutVariant from './ProductVariant'

const ProductSingle = ({product}) => {
    const {t} = useTranslation()
    const chartSizeImg = product.galleryImages.nodes.find(img => img.altText.includes("chart"))
    const galleries = [product.image, ...product.galleryImages.nodes.filter(img => !img.altText.includes("chart"))]
    const [variationId, setVariationId] = useState(0)
    const [quantity, setQuantity] = useState(1)
    
  return (
    <Container as="article">
        <Row className="border">
            <Col md={6} className="p-0 d-flex justify-content-center border-right">
                <ProductSingleCarousel images={galleries} />
            </Col>
            <Col md={6}>
                <Row className="border-bottom">
                    <Col className="d-flex justify-content-between py-3">
                        <h3 className="">{product.name}</h3>
                        <h3 className="">{product.price.substring(1)} €</h3>
                    </Col>
                </Row>
                <Row className="py-3 align-items-center">
                    <ProdutVariant
                        quantity={quantity}
                        variationId={variationId}
                        setQuantity={setQuantity}
                        setVariationId={setVariationId}
                        product={product}
                    />
                </Row>
                <Row className="py-2">
                    <Col className="d-flex justify-content-center">
                        <AddToCartBtn
                            product={product}
                            variationId={variationId}
                            quantity={quantity}
                            setQuantity={setQuantity}
                            setVariationId={setVariationId}
                        />
                    </Col>
                </Row>
                <Row className="border-top py-2">
                    <Col className="d-flex justify-content-center">
                        <ListGroup as="ul" horizontal>
                            <ListGroup.Item as="li" className="d-flex flex-column align-items-center">
                                <FontAwesomeIcon className="icon-entrust-big" icon={faCreditCard} />
                                <small>{t("entrust.stripe")}</small>
                            </ListGroup.Item>
                            <ListGroup.Item as="li" className="d-flex flex-column align-items-center">
                                <FontAwesomeIcon className="icon-entrust-big" icon={faCcPaypal} />
                                <small>{t("entrust.paypal")}</small>
                            </ListGroup.Item>
                            <ListGroup.Item as="li" className="d-flex flex-column align-items-center">
                                <FontAwesomeIcon className="icon-entrust-big" icon={faShieldAlt} />
                                <small>{t("entrust.ssl")}</small>
                            </ListGroup.Item>
                            <ListGroup.Item as="li" className="d-flex flex-column align-items-center">
                                <FontAwesomeIcon className="icon-entrust-big" icon={faExpeditedssl} />
                                <small>{t("entrust.secure")}</small>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
                <Row className="border-top py-2">
                    <Col className="d-flex flex-column align-items-center">
                        <h6>{t("entrust.shipping.title")}</h6>
                        <ListGroup as="ul" horizontal>
                        {
                            ["standardFlatRate", "expressFlatRate", "standardRelayRate"].map(value => (
                                <ListGroup.Item as="li" key={value}>
                                    <small>{t(`entrust.shipping.${value}`)}</small>
                                </ListGroup.Item>
                            ))
                        }
                        </ListGroup>
                    </Col>
                </Row>
                <Row className="border-top py-2">
                    <Col className="d-flex flex-column align-items-center">
                        <h6>{t("entrust.carrier.title")}</h6>
                        <ListGroup as="ul" horizontal>
                            <ListGroup.Item as="li" className="d-flex flex-column align-items-center">
                                <FontAwesomeIcon className="icon-entrust-middle" icon={faBox} />
                                <small>Colissimo</small>
                            </ListGroup.Item>
                            <ListGroup.Item as="li" className="d-flex flex-column align-items-center">
                                <FontAwesomeIcon className="icon-entrust-middle" icon={faDhl} />
                                <small>DHL</small>
                            </ListGroup.Item>
                            <ListGroup.Item as="li" className="d-flex flex-column align-items-center">
                                <FontAwesomeIcon className="icon-entrust-middle" icon={faUps} />
                                <small>UPS</small>
                            </ListGroup.Item>
                            <ListGroup.Item as="li" className="d-flex flex-column align-items-center">
                                <FontAwesomeIcon className="icon-entrust-middle" icon={faUsps} />
                                <small>Usps</small>
                            </ListGroup.Item>
                            <ListGroup.Item as="li" className="d-flex flex-column align-items-center">
                                <FontAwesomeIcon className="icon-entrust-middle" icon={faFedex} />
                                <small>Fedex</small>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row className="mt-4">
            <Col className="px-0">
                <AccordionContainer>
                    <DescriptionAccordion description={product?.description} />
                    {chartSizeImg && <ChartSizeAccordion chartSizeImg={chartSizeImg} />}
                    <ReviewsAccordion />
                </AccordionContainer>
            </Col>
        </Row>
    </Container>
  )
}

export default ProductSingle