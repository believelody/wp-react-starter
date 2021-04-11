import gql from "graphql-tag";

export const APPLY_COUPON_MUTATION = gql`
    mutation ($input: ApplyCouponInput!) {
        applyCoupon(input: $input) {
            cart {
                total
            }
        }
    }
`