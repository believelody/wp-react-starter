import gql from "graphql-tag";

export const GET_CART_QUERY = gql`
  query getCart {
    cart {
      isEmpty
      subtotal
      total
      availableShippingMethods {
        rates {
          cost
          id
          methodId
          label
        }
      }
      contents {
        nodes {
          key
          variation {
            variationId
            id
            stockQuantity
            price
            attributes {
              nodes {
                value
              }
            }
          }
          quantity
          subtotal
          total
          product {
            id
            productId
            name
            slug
            image {
              altText
              id
              sourceUrl
            }
          }
        }
        itemCount
      }
      chosenShippingMethod
    }
  }
`