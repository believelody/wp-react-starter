import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { useLocation, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useContextApp } from '../context/AppContext'
import { GET_CATEGORY_QUERY } from '../graphql/queries/categories/oneCategory.query'
import CategorySingle from '../components/categories/CategorySingle'
import PageBg from '../components/page/PageBg'
import Breadcrumb, { setBreadcrumbs } from '../components/breadcrumb/Breadcrumb'

const CategorySinglePage = () => {
  const {t} = useTranslation()
    const { slug } = useParams()
    const { pathname } = useLocation()
    const {
        contextLoading: [, setLoading],
  } = useContextApp()

  const { data, loading } = useQuery(GET_CATEGORY_QUERY, {
      variables: { id: slug },
      onError: error => console.log(error)
  })

  useEffect(() => {
      setLoading(loading)
  }, [loading, setLoading])

  return (
    !loading &&
    <PageBg bgUrl={data?.productCategory.image.sourceUrl}>
      <Breadcrumb objSlugs={setBreadcrumbs(pathname, t)} />
      <CategorySingle category={data?.productCategory} />
    </PageBg>
  )
}

export default CategorySinglePage
