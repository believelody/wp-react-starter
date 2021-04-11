import React from 'react'
import { Image } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import AccordionItem from './AccordionItem'

const ChartSizeAccordion = ({ activeIndex, index, setActiveIndex, chartSizeImg }) => {
    const {t} = useTranslation()

    return (
        <AccordionItem
            title={t("products.single.chart")}
            index={index}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
        >
            <div className="text-center">
                <Image src={chartSizeImg.sourceUrl} alt={chartSizeImg.altText} />
            </div>
        </AccordionItem>
  )
}

export default ChartSizeAccordion
