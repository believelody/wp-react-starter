import React from 'react'
import { useQuery } from '@apollo/client'
import { ButtonGroup, Dropdown } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { Link, useHistory } from 'react-router-dom'
import { GET_CATEGORIES_QUERY } from '../../graphql/queries/categories/allCategories.query'

const DropdownCategories = () => {
    const { t } = useTranslation()
    const history = useHistory()
    const { data } = useQuery(GET_CATEGORIES_QUERY, {
        onError: ({ graphQLErrors }) => console.log(graphQLErrors)
    })

    return (
        <Dropdown as={ButtonGroup}>
            <Link to="/categories">
                <span className="nav-link text-light">{t(`navbar.categories`)}</span>
            </Link>

            <Dropdown.Toggle split variant="dark" id="dropdown-split-basic" />

            <Dropdown.Menu>
                {data?.productCategories?.nodes.map(category => (
                    <Dropdown.Item key={category.id} onClick={() => history.push(`/categories/${category.slug}`)}>
                        <span className="text-dark">{t(`categories.${category.slug}`)}</span>
                    </Dropdown.Item>)
                )}
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default DropdownCategories
