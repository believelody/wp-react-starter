import gql from "graphql-tag";

export const GET_CATEGORY_QUERY = gql`
    query getCategory ($id: ID!) {
        productCategory(id: $id, idType: SLUG) {
            name
            slug
            id
            databaseId
            image {
                sourceUrl
                altText
            }
            products {
                nodes {
                    ... on VariableProduct {
                        name
                        price
                        productId
                        shortDescription
                        id
                        slug
                        image {
                            altText
                            sourceUrl
                        }
                        variations {
                            nodes {
                                variationId
                                stockQuantity
                                attributes {
                                    nodes {
                                        value
                                    }
                                }
                            }
                        }
                        attributes {
                            nodes {
                                name
                            }
                        }
                    }
                }
            }
        }
    }
`