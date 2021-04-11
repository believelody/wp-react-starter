import gql from "graphql-tag";

export const UPDATE_QUANTITY_MUTATION = gql`
    mutation ($input: UpdateItemQuantitiesInput!) {
        updateItemQuantities(input: $input) {
            updated {
                key
                quantity
            }
        }
    }
`