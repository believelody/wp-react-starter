import React from 'react'
import {  Card } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import AccordionItem from './AccordionItem'

const ReviewsAccordion = ({ activeIndex, index, setActiveIndex }) => {
  const {t} = useTranslation()

  return (
    <AccordionItem
      activeIndex={activeIndex}
      index={index}
      setActiveIndex={setActiveIndex}
      title={t("products.single.reviews")}
    >
      <Card.Body>
        Reviews
      </Card.Body>
    </AccordionItem>
  )
}

export default ReviewsAccordion
