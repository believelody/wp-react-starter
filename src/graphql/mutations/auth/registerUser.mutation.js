import gql from "graphql-tag";

export const REGISTER_USER_MUTATION = gql`
    mutation RegisterUser ($input: RegisterUserInput!) {
        registerUser(input: $input) {
            user {
                id
                email
                username
                jwtAuthToken
                jwtRefreshToken
            }
        }
    }
`

export const REGISTER_CUSTOMER_MUTATION = gql`
    mutation RegisterCustomerMeta ($input: RegisterCustomerMetaInput!) {
        registerCustomerMeta(input: $input) {
            authToken
            refreshToken
            customer {
                id
                email
                username
                metaData(keysIn: ["gender", "isVerified"]) {
                    key
                    value
                }
            }
        }
    }
`