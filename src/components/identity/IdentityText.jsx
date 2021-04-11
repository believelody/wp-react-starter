import React from 'react'
import { useTranslation } from 'react-i18next'

const IdentityText = ({ user }) => {
    const {t} = useTranslation()
  return (
    <section className="text-center">
      <p>
          <span>{t("cart.accordion.identity.name")}</span>
          <strong>{user.name || user.username}</strong>
      </p>
      <p>
          <span>{t("cart.accordion.identity.email")}</span>
          <strong>{user.email}</strong>
      </p>
      <p>
          <span>{t("cart.accordion.identity.phoneNumber")}</span>
          <strong>{user.phoneNumber || t("cart.accordion.identity.noPhoneNumber")}</strong>
      </p>
    </section>
  )
}

export default IdentityText
