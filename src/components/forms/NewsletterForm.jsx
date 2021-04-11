import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const NewsletterForm = () => {
    const [email, setEmail] = useState("")
    const {t} = useTranslation()

    const handleSubmit = e => {
        e.preventDefault()
    }

  return (
    <Form onSubmit={handleSubmit} className={`d-flex align-items-center`}>
      <Form.Control
        name="email"
        type="email"
        placeholder={t("footer.newsletter")}
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <Button variant="light" size="sm" style={{ height: 35 }}>
        <FontAwesomeIcon className={``} icon={faEnvelope} />
      </Button>
    </Form>
  )
}

export default NewsletterForm
