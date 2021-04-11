import React from 'react'
import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const AddressText = ({ address, title, handleModal }) => {
  const {t} = useTranslation()
  return (
    <section className="d-block p-2 bg-light border border-secondary rounde5">
        <h5 className="text-center">{title} :</h5>
      <div>{address.address1}</div>
      {address.address2 && <div>{address.address2}</div>}
      <div>
        <span>{address.postcode}</span>
        <span className="ml-2">{address.city}</span>
      </div>
      <div>{address.country}</div>
      <Button
        variant="light"
        className="mt-2 ml-auto"
        size="sm"
        onClick={handleModal}
      >
        <u>{t("actions.button.changeAddress")}</u>
      </Button>
    </section>
  )
}

export default AddressText
