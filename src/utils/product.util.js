export const maxQuantity = product => product.stockQuantity / 5
export const productPriceWithComma = price => price.substring(1)
export const replacePriceWithComma = price => price.replace(".", ",")
export const productRawPrice = price => parseFloat(price.replace(",", ".").substring(1))