import gql from "graphql-tag";

export const CHECKOUT_MUTATION = gql`
    mutation ($input: CheckoutInput!) {
        checkout(input: $input) {
            result
            redirect
            order {
                id
                orderId
                orderNumber
                paymentMethod
                status
            }
        }
    }
`