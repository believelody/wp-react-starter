import gql from "graphql-tag";

export const PRODUCT_QUERY = gql`query getProduct($id: ID!) {
    product(id: $id, idType: SLUG) {
    ... on VariableProduct {
      id
      productId
      name
      price
      description
      stockQuantity
      image {
        id
        sourceUrl
        altText
      }
      galleryImages {
        nodes {
          id
          sourceUrl
          altText
        }
      }
      productCategories {
        nodes {
          image {
            altText
            sourceUrl
          }
          slug
        }
      }
      variations {
        nodes {
          variationId
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
}`