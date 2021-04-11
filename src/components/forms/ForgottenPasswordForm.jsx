import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const ForgottenPasswordForm = ({ setCurrentAuthForm }) => {
    const { t } = useTranslation()

    const [email, setEmail] = useState("")

    const handleSubmit = e => {
        e.preventdefault()
    }
    
    return (
        <Container>
            <h5 className="text-center">{t("auth.forgottenPassword")}</h5>
            <Form onSubmit={handleSubmit} className="my-4">
                <Form.Group>
                    <Form.Label>
                        {t("auth.form.label.email")}
                    </Form.Label>
                    <Form.Control
                        as="input"
                        name="email"
                        value={email}
                        placeholder={t("auth.form.placeholder.email")}
                        onChange={e => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Button
                    type="submit"
                    disabled={true}
                    variant="bg-dark text-white"
                >
                    <span>{t("auth.form.submit.forgottenPassword")}</span>
                </Button>
            </Form>
            <div onClick={e => setCurrentAuthForm("login")}>
                <u className="text-muted">{t("auth.switch.login")}</u>
            </div>
        </Container>
    )
}

export default ForgottenPasswordForm
