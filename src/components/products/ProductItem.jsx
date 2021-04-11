import React, { useState } from 'react'
import {NavLink, useLocation} from "react-router-dom"
import { useTranslation } from 'react-i18next'
import { Card } from 'react-bootstrap'
import DropdownQuickBuy from '../dropdown/DropdownQuickBuy'
import { productPriceWithComma } from '../../utils/product.util'
import "./Product.css"

const ProductItem = ({ product }) => {
  const { t } = useTranslation()
  const {pathname} = useLocation()
  const [variationId, setVariationId] = useState(0)
  const [quantity, setQuantity] = useState(1)
  
  return (
      <Card className="h-100 product-item-col">
        <div>
          <Card.Img variant="top" className="h-auto w-100 product-item-img" src={product.image.sourceUrl} alt={product.image.altText} />
        </div>
        <Card.Body className="py-1 d-flex flex-column justify-content-between">
          <Card.Title className="font-weight-bold">
            <h5>{product.name}</h5>
          </Card.Title>
          <section className="d-flex align-items-end justify-content-between">
            <div className="text-center font-weight-bold">{productPriceWithComma(product.price)} €</div>
            <div>
              {
                [...product.variations.nodes]
                .sort((a, b) => a.variationId > b.variationId)
                .map(variation => {
                  
                  return variation.stockQuantity &&
                    <span key={variation.variationId} className="mx-2">
                      {variation.attributes.nodes[0].value}
                    </span>
                })
              }
            </div>
          </section>
        </Card.Body>
        <Card.Footer className="d-flex align-items-center justify-content-between">
          <NavLink
            to={`${pathname.length > 1 ? pathname : ""}/${product.slug}`}
            className="btn btn-info px-5"
          >
            {t("products.item.viewBtn")}
          </NavLink>
          <DropdownQuickBuy
            quantity={quantity}
            variationId={variationId}
            setQuantity={setQuantity}
            setVariationId={setVariationId}
            product={product}
          />
        </Card.Footer>
      </Card>
  )
}

export default ProductItem