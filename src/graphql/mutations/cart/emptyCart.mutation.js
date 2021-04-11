const { default: gql } = require("graphql-tag");

export const EMPTY_CART_MUTATION = gql`
    mutation ($input: EmptyCartInput!) {
        emptyCart (input: $input) {
            cart {
                isEmpty
            }
        }
    }
`