import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import ProductItem from "./ProductItem"
import "./Product.css"

const Products = ({ products }) => {
    
  return (
      <Container fluid="sm">
          <Row className="m-3 justify-content-start">
            {
                products?.length ?
                products.map(product => (
                    <Col key={product.id} className="flex-grow-0 p-0 m-2">
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

export default Products