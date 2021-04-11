import React from 'react'
import { Col, Image, Row } from 'react-bootstrap'

const Thumbnails = ({ thumbnails, handleClick, height, activeIndex }) => {
  return (
      <Row>
          {
              thumbnails.map((img, index) => (
                  <Col
                    key={img.sourceUrl}
                    className={`${index === activeIndex ? "border border-dark" : ""} d-flex justify-content-center`}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleClick(index)}
                >
                      <Image
                          src={img.sourceUrl}
                          alt={img.altText}
                          height={height}
                          width={"auto"}
                      />
                  </Col>
              ))
          }
      </Row>
  )
}

export default Thumbnails
