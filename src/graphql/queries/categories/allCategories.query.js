const { default: gql } = require("graphql-tag");

export const GET_CATEGORIES_QUERY = gql`
    query getCategories {
        productCategories {
            nodes {
                slug
                id
                databaseId
                image {
                    sourceUrl
                    altText
                }
                count
            }
        }
    }
`