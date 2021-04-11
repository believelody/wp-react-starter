import gql from "graphql-tag";

export const LOGIN_USER_MUTATION = gql`
    mutation LoginUser ($input: LoginInput!) {
        login(input: $input) {
            authToken
            refreshToken
            customer {
                id
                username
                email
                metaData(keysIn: ["gender", "isVerified"]) {
                    key
                    value
                }
            }
        }
    }
`