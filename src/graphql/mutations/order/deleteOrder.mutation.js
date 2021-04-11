import gql from "graphql-tag";

export const DELETE_ORDER_MUTATION = gql`
    mutation ($input: DeleteOrderInput!) {
        deleteOrder(input: $input) {
            order {
                id
                orderId
            }
        }
    }
`