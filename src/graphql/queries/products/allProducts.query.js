import gql from "graphql-tag";

export const PRODUCTS_QUERY = gql`query getProducts {
  products {
    nodes {
      ... on VariableProduct {
        name
        price
        productId
        shortDescription
        id
        slug
        image {
          altText
          sourceUrl
        }
        variations {
          nodes {
            variationId
            stockQuantity
            attributes {
              nodes {
                value
              }
            }
          }
        }
        attributes {
          nodes {
            name
          }
        }
      }
    }
  }
}`