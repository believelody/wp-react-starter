import gql from "graphql-tag";

export const UPDATE_SHIPPING_METHOD = gql`
    mutation ($input: UpdateShippingMethodInput!) {
        updateShippingMethod(input: $input) {
            cart {
                chosenShippingMethod
            }
        }
    }
`