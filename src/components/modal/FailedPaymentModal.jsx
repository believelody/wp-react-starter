import React from 'react'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Jumbotron } from 'react-bootstrap'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import "./Modal.css"

const FailedPaymentModal = ({ handleClose }) => {
    const { t } = useTranslation()
    return (
        <Jumbotron className="d-block text-center">
            <FontAwesomeIcon className="icon-size icon-fail mb-2" icon={faTimesCircle} />
            <p className="text-danger px-5">{t("actions.modal.payment.fail.text")}</p>
            <Button onClick={handleClose} variant="dark">{t("actions.modal.payment.fail.btn")}</Button>
        </Jumbotron>
    )
}

export default FailedPaymentModal
