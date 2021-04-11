import gql from "graphql-tag";

export const ADD_TO_CART_MUTATION = gql`
    mutation ($input: AddToCartInput!) {
        addToCart(input: $input) {
            cartItem {
                key
                product {
                    productId
                    name
                    description
                    reviews {
                        averageRating
                    }
                    reviewCount
                    image {
                        id
                        sourceUrl
                        altText
                    }
                }
                variation {
                    id
                    variationId
                    name
                    price
                    stockQuantity
                    attributes {
                        nodes {
                            value
                        }
                    }
                }
                quantity
                total
                subtotal
            }
        }
    }
`