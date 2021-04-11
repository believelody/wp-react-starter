import React from 'react'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { Col, Row } from 'react-bootstrap'

const ErrorList = ({ errors, baseKeyTrad, title, col = 12 }) => {
    const {t} = useTranslation()
  return (
    <>
        { title && <small>{title}</small> }
        <Row>
            {
                errors.map((invalids, index) => {
                    let msg = invalids.join(".")
                    return (                        
                        <Col xs={col} key={index} className={`text-small`}>
                            <FontAwesomeIcon color="red" icon={faTimes} />
                            <span className="ml-2 text-danger">{t(`${baseKeyTrad}.errors.${msg}`)}</span>
                        </Col>
                    )
                })
            }
        </Row>
    </>
  )
}

export default ErrorList
