import React, { useState } from 'react'
import { Dropdown } from 'react-bootstrap';
import i18n from '../../translation/i18n';

const DropdownSelectLang = () => {
    const languages = Object.keys(i18n.options.resources)
    const [currentLanguage, setCurrentLanguage] = useState(i18n.language)

    const handleClick = async lang => {
        await i18n.changeLanguage(lang)
        setCurrentLanguage(lang)
    }

    return (
    <Dropdown>
        <Dropdown.Toggle variant="outline-light">{i18n.t(`languages.${currentLanguage}`)}</Dropdown.Toggle>
        <Dropdown.Menu>
            {
                languages
                    .filter(language => language !== currentLanguage)
                    .map(lang => (
                        <Dropdown.Item key={lang} onClick={() => handleClick(lang)}>{i18n.t(`languages.${lang}`)}</Dropdown.Item>
                ))
            }
        </Dropdown.Menu>
    </Dropdown>
  )
}

export default DropdownSelectLang
