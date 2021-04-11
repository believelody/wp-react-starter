import gql from "graphql-tag";

export const VERIFY_CUSTOMER_MUTATION = gql`
    mutation VerifyCustomer($input: VerifyCustomerInput!) {
        verifyCustomer(input: $input) {
            isVerified
        }
    }
`

export const RESEND_CODE_MUTATION = gql`
    mutation ResendCode($input: ResendCodeInput!) {
        resendCode(input: $input) {
            isResend
        }
    }
`