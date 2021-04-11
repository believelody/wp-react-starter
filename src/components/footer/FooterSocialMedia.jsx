import React from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const FooterSocialMedia = () => {
    const {t} = useTranslation()
    
    return (
        <DropdownButton
            className={``}
            id="footer-menu"
            variant="dark"
            drop="up"
            title={t("footer.social")}
        >
            <Dropdown.Item>Facebook</Dropdown.Item>
            <Dropdown.Item>Instagram</Dropdown.Item>
            <Dropdown.Item>Twitter</Dropdown.Item>
            <Dropdown.Item>Tik Tok</Dropdown.Item>
        </DropdownButton>
  )
}

export default FooterSocialMedia
