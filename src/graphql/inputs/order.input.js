import { v4 } from "uuid";

export const orderInput = ({ billing, }) => ({
    clientMutationId: v4(),
    isPaid: false,
})

export const deleteOrderInput = ({ forceDelete = false, orderId, id }) => ({
    clientMutationId: v4(),
    forceDelete,
    orderId,
    id,
})