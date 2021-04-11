import { v4 } from "uuid";

export const updateShippingMethodInput = shippingMethods => ({
    clientMutationId: v4(),
    shippingMethods
})