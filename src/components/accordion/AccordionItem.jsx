import React from 'react'
import { Accordion, Card } from 'react-bootstrap'
import AccordionTitle from './AccordionTitle'

const AccordionItem = ({ children, title, subtitle, activeIndex, index, setActiveIndex}) => {
    const open = activeIndex === index
  return (
      <Card>
          <AccordionTitle
            index={index}
            open={open}
            title={title}
            subtitle={subtitle}
            handleClick={() => setActiveIndex(open ? "-1" : index)}
          />
          <Accordion.Collapse eventKey={index}>
            {children}
          </Accordion.Collapse>
      </Card>
  )
}

export default AccordionItem
