import React from 'react'
import { Card } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import CartItem from '../cart/CartItem'
import AccordionItem from './AccordionItem'
import "./Accordion.css"

const CartResumeAccordion = ({ items, index, activeIndex, setActiveIndex }) => {
    const { t } = useTranslation()
    
    return (
        <AccordionItem
            activeIndex={activeIndex}
            index={index}
            setActiveIndex={setActiveIndex}
            title={`1. ${t("cart.accordion.cartResume.label")}`}
            subtitle={t("cart.accordion.cartResume.subtitle")}
        >
            <Card.Body>
                {
                    items?.map(item => (
                        <CartItem key={item.key} item={item} />
                    ))
                }
            </Card.Body>
        </AccordionItem>
    )
}

export default CartResumeAccordion
