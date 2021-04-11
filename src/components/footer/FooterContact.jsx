import React from 'react'
import { useTranslation } from 'react-i18next'

const FooterContact = () => {
  const {t} = useTranslation()
  return (
    <div className={`text-light`}>
      {t("footer.contact")}
    </div>
  )
}

export default FooterContact
