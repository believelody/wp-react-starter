import { v4 } from "uuid"

export const updateItemQuantitiesInput = (itemKey, newQuantity) => ({
    clientMutationId: v4(),
    items: [{ key: itemKey, quantity: newQuantity }]
})
export const removeItemsFromCartInput = ({productKeys = [], removeAll = false}) => ({
    all: removeAll,
    clientMutationId: v4(),
    keys: productKeys
})
export const emptyCartInput = () => ({
    clientMutationId: v4()
})
export const applyCouponInput = code => ({
    clientMutationId: v4(),
    code
})