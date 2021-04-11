import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { useLocation, useParams } from 'react-router-dom'
import ProductSingle from '../components/products/ProductSingle'
import PageBg from "../components/page/PageBg"
import { useContextApp } from '../context/AppContext'
import { PRODUCT_QUERY } from '../graphql/queries/products/oneProduct.query'
import Breadcrumb, { setBreadcrumbs } from '../components/breadcrumb/Breadcrumb'
import { useTranslation } from 'react-i18next'

const ProductSinglePage = () => {
  const {t} = useTranslation()
  const { slug } = useParams()
  const { pathname } = useLocation()
  const { contextLoading: [, setLoading] } = useContextApp()
  const { data, loading } = useQuery(PRODUCT_QUERY, {
    variables: { id: slug },
    onError: error => console.log(error)
  })

  useEffect(() => {
    setLoading(loading)
  }, [loading, setLoading])
    
  return (
    !loading &&
    <PageBg bgUrl={data?.product.productCategories.nodes[0].image.sourceUrl}>
      <Breadcrumb objSlugs={setBreadcrumbs(pathname, t, { slug, name: data?.product.name })} />
      <ProductSingle product={data?.product} />
    </PageBg>
  )
}

export default ProductSinglePage
