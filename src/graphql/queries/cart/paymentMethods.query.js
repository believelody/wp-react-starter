import gql from "graphql-tag";

export const PAYMENT_METHODS_QUERY = gql`
    query getPaymentMethods {
        paymentGateways {
            nodes {
                id
            }
        }
    }
`