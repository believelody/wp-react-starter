import React from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const FooterMenu = () => {
    const { t } = useTranslation()

  return (
    <DropdownButton
      className={``}
      variant="dark"
      id="footer-menu"
      drop="up"
      title={t("footer.menu")}
    >
      <Dropdown.Item>FAQ</Dropdown.Item>
      <Dropdown.Item>CGU</Dropdown.Item>
      <Dropdown.Item>SAV</Dropdown.Item>
      <Dropdown.Item>Sitemap</Dropdown.Item>
    </DropdownButton>
  )
}

export default FooterMenu
