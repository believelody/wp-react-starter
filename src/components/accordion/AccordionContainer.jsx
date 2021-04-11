import React, { useState } from 'react'
import { Accordion } from 'react-bootstrap'

const AccordionContainer = ({ defaultActiveKey = "-1", children }) => {
    const [activeIndex, setActiveIndex] = useState(defaultActiveKey)

  return (
    <Accordion defaultActiveKey={activeIndex}>
    {
        children &&
        React.Children.map(children, (child, index) => (
            <child.type
                {...child.props}
                key={index}
                index={(index + 1).toString()}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
            />
        ))
    }
    </Accordion>
  )
}

export default AccordionContainer
