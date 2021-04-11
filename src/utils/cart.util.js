export const productInCart = (items, productId, variationId) => {
    return items?.find(item => item.variation.variationId === variationId && item.product.productId === productId)
}

export const checkProductInCart = (items, productId, variationId) => {
    return items?.some(item => item.variation.variationId === variationId && item.product.productId === productId)
}