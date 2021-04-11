import React from 'react'
import { Jumbotron, Spinner } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import "./Modal.css"

const LoadingPaymentModal = () => {
    const { t } = useTranslation()
    return (
        <Jumbotron className="d-block text-center">
            <Spinner className="icon-size mb-5" animation="border" />
            <p className="px-5">{t("actions.modal.payment.loading")}</p>
        </Jumbotron>
    )
}

export default LoadingPaymentModal
