import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { useContextApp } from '../context/AppContext'
import { GET_CATEGORIES_QUERY } from '../graphql/queries/categories/allCategories.query'
import Categories from '../components/categories/Categories'
import PageBg from '../components/page/PageBg'

const CategoriesPage = () => {
    const {
        contextLoading: [, setLoading],
  } = useContextApp()
  
    const { data, loading } = useQuery(GET_CATEGORIES_QUERY, {
        onError: error => console.log(error)
    })

    useEffect(() => {
        setLoading(loading)
    }, [loading, setLoading])

  return (
    !loading &&
      <PageBg bgUrl="/images/weliftup-categories-brett-jordan-optimized.jpg">
        <Categories categories={data?.productCategories?.nodes} />
    </PageBg>
  )
}

export default CategoriesPage
