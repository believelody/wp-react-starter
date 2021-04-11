import { faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Carousel, Image } from 'react-bootstrap'
import Thumbnails from '../thumbnails/Thumbnails'

const ProductSingleCarousel = ({ images }) => {
    const [activeIndex, setActiveIndex] = useState(0)

    return (
        <div>
            <Carousel
                indicators={false}
                activeIndex={activeIndex}
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
                        <Carousel.Item key={image.sourceUrl}>
                            <Image
                                className={`d-block w-100`}
                                src={image.sourceUrl}
                                alt={image.altText}
                            />
                        </Carousel.Item>)
                    )
                }
            </Carousel>
            <div className="col">
                <Thumbnails
                    thumbnails={images}
                    height={50}
                    handleClick={setActiveIndex}
                    activeIndex={activeIndex}
                />
            </div>
        </div>
    )
}

export default ProductSingleCarousel
