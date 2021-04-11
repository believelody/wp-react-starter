import { v4 } from "uuid";

export const checkoutInput = ({ source = null, isPaid = false, transactionId = "", customerNote = "", shipping, billing, paymentMethod, shippingMethod, shipToDifferentAddress, account = null }) => ({
    clientMutationId: v4(),
    isPaid,
    customerNote,
    shipping,
    billing,
    paymentMethod,
    shippingMethod,
    shipToDifferentAddress,
    account,
    transactionId,
    metaData: !source ? null : [
        {
            key: "_stripe_source_id",
            value: source.id,
        }
    ]
})