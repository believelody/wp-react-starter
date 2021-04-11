import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import Container from '../container/Container'
import ProductItem from '../products/ProductItem'

const CategorySingle = ({ category }) => {
    const {t} = useTranslation()

    return (
    <Container>
        <h1 className="mt-4 text-center">{t(`categories.${category?.slug}`)}</h1>
        <hr />
        <Row className="m-3 justify-content-between">
            {
                category?.products.nodes.length ?
                category?.products.nodes.map(product => (
                    <Col key={product.id} className="flex-grow-0 p-0 my-3">
                        <ProductItem product={product} />
                    </Col>
                ))
                :
                <p>There is no product</p>
            }
        </Row>
    </Container>
  )
}

export default CategorySingle
