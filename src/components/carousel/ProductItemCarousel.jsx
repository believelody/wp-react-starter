import { faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Carousel, Image } from 'react-bootstrap'

const ProductItemCarousel = ({ images }) => {

    return (
    <Carousel
        indicators={false}        
        prevIcon={
            <FontAwesomeIcon
                icon={faChevronCircleLeft}
                size="3x"
                color="black"
            />
        }
        nextIcon={
            <FontAwesomeIcon
                icon={faChevronCircleRight}
                size="3x"
                color="black"
            />
        }
    >
    {
        images.map(image => (
            <Carousel.Item key={image.altText}>
                <Image
                    className={`d-block w-100`}
                    src={image.sourceUrl}
                    alt={image.altText}
                />
            </Carousel.Item>)
        )
    }
    </Carousel>
  )
}

export default ProductItemCarousel
