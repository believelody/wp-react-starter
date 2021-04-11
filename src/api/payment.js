import axios from 'axios'
import { makeUrl } from "./index"

const paymentUrl = makeUrl("stripe-payment")

const PaymentService = {
    payment: paymentData => axios.post(paymentUrl, paymentData)
}

export default PaymentService