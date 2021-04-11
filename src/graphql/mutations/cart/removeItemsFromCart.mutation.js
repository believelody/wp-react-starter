const { default: gql } = require("graphql-tag");

export const REMOVE_ITEM_FROM_CART = gql`
    mutation ($input: RemoveItemsFromCartInput!) {
        removeItemsFromCart(input: $input) {
            cartItems {
                key
                product {
                    name
                }
            }
        }
    }
`