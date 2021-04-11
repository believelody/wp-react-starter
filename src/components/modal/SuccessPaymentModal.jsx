import React from 'react'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Jumbotron } from 'react-bootstrap'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import "./Modal.css"

const SuccessPaymentModal = ({ handleClose }) => {
  const { t } = useTranslation()
  return (
    <Jumbotron className="d-block text-center">
      <FontAwesomeIcon className="icon-size icon-success mb-2" icon={faCheckCircle} />
      <p className="px-5">{t("actions.modal.payment.success.text")}</p>
      <p>
        <strong>{t("actions.modal.payment.success.ending")}</strong>
      </p>
      <Link to="/">
        <Button onClick={handleClose} variant="light">
          <span>{t("actions.modal.payment.success.link")}</span>
        </Button>
      </Link>
    </Jumbotron>
  )
}

export default SuccessPaymentModal
