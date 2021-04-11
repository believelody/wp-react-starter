import React from 'react'
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Accordion } from 'react-bootstrap'
import "./Accordion.css"

const AccordionTitle = ({ open, title, subtitle, index, handleClick }) => {
    return (
        <Accordion.Toggle onClick={handleClick} className={`d-flex align-items-center justify-content-center ${open ? "title-big" : "title-normal"} text-center p-2 bg-light border-bottom`} as="div" eventKey={index}>
            {open && <FontAwesomeIcon icon={faCaretRight} />}
            <div className={`px-4 d-flex flex-column`}>
                <span>{title}</span>
                { !open && <small className="subtitle-text">{subtitle}</small> }
            </div>
            {open && <FontAwesomeIcon icon={faCaretLeft} />}
        </Accordion.Toggle>
    )
}

export default AccordionTitle
