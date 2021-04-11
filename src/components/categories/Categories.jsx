import React from 'react'
import { Image } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Container from '../container/Container'
import "./Categories.css"

const Categories = ({ categories }) => {
  const {t} = useTranslation()
    
  return (
    <Container>
      <h1 className="mt-4 text-center">{t("categories.title")}</h1>
      <hr />
      <ul className="category-list">
        {
          categories?.map(category => (
            <li key={category.id} className="category-item rounded">
              <Link to={`/categories/${category.slug}`}>
                <Image
                  src={category.image.sourceUrl}
                  alt={category.image.altText}
                  className="category-img"
                />
                <section>
                  <h2>{t(`categories.${category.slug}`)}</h2>
                  <h5>{category.count} {t(`categories.${category.count > 1 ? "items" : "item"}`)}</h5>
                </section>
              </Link>
            </li>
          ))
        }
      </ul>
    </Container>
  )
}

export default Categories
