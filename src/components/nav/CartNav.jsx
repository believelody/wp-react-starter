import React from 'react'
import { useContextApp } from "../../context/AppContext"
import i18n from '../../translation/i18n'
import { productPriceWithComma } from '../../utils/product.util'
import "./Nav.css"

const CartNav = () => {
    const {contextCheckout: [{cart}]} = useContextApp()

  return (
    <section className={`${cart && !cart?.isEmpty ? "font-weight-bold" : ""}`}>
      <span>
        {i18n.t("cart.label")}
      </span>
      <span className={`ml-2 px-2 py-1 bg-${cart?.contents.itemCount ? "warning" : "dark"} text-${cart?.contents.itemCount ? "dark" : "white"} rounded-circle`}>
        {cart?.contents.nodes.length || 0}
      </span>
      <span className="ml-2">
        {cart && productPriceWithComma(cart.subtotal) + " €"}
      </span>
    </section>
  )
}

export default CartNav