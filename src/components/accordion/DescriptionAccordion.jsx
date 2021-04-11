import React from 'react'
import { Card } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'
import AccordionItem from './AccordionItem'

const DescriptionAccordion = ({ activeIndex, index, setActiveIndex, description }) => {
  const {t} = useTranslation()
  
  return (
    <AccordionItem
      activeIndex={activeIndex}
      index={index}
      setActiveIndex={setActiveIndex}
      title={t("products.single.description")}
    >
      <Card.Body>
        <ReactMarkdown source={description} escapeHtml={false} />
      </Card.Body>
      </AccordionItem>
  )
}

export default DescriptionAccordion
