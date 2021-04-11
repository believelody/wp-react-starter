import { v4 } from "uuid";

export const productQueryInput = (productId, quantity, variationId) => ({
    clientMutationId: v4(),
    productId,
    quantity,
    variationId
})