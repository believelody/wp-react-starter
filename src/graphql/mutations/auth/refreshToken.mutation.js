import gql from "graphql-tag";

export const REFRESH_TOKEN_MUTATION = gql`
    mutation ($input: RefreshJwtAuthTokenInput!) {
        refreshJwtAuthToken(input: $input) {
            authToken
        }
    }
`