import React, { useRef, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useContextApp } from '../../context/AppContext'
import { useFormValidation } from '../../hooks/useFormValidation'
import ErrorList from '../errors/ErrorList'
import "./Form.css"

const GuestForm = ({ handleEdited }) => {
    const { t } = useTranslation()
    const { contextAuth: [{guest: localGuest}, { updateAuth }] } = useContextApp()
    const formRef = useRef()
    const [guest, setGuest] = useState(localGuest ?? { name: "", email: "", phoneNumber: "" })
    const [{ errors, isFormValid }, { handleInputTarget }] = useFormValidation(formRef)

    const handleChange = e => {
        const { name, value } = e.target
        setGuest(prevState => ({ ...prevState, [name]: value }))
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (isFormValid) {
            updateAuth({ guest })
            setGuest({ name: "", email: "" })
            handleEdited(false)
        }
    }

    // console.log(isFormValid)

    return (
        <Container className="px-5">
            <h5 className="text-center">
                {t("auth.guest")}
            </h5>
            <Form id="guest-form" onSubmit={handleSubmit} ref={formRef} noValidate>
                <Form.Group>
                    <Form.Label htmlFor="guest-name">{t("auth.form.label.name")}</Form.Label>
                    <Form.Control
                        id="guest-name"
                        tabIndex={1}
                        name="name"
                        value={guest.name}
                        placeholder={t("auth.form.placeholder.name")}
                        onChange={handleChange}
                        onInput={e => handleInputTarget(e.target)}
                        required
                        autoFocus
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="guest-email">{t("auth.form.label.email")}</Form.Label>
                    <Form.Control
                        id="guest-email"
                        tabIndex={1}
                        type="email"
                        name="email"
                        value={guest.email}
                        placeholder={t("auth.form.placeholder.email")}
                        onChange={handleChange}
                        onInput={e => handleInputTarget(e.target)}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="guest-phoneNumber">{t("auth.form.label.phoneNumber")}</Form.Label>
                    <Form.Control
                        id="guest-phoneNumber"
                        tabIndex={3}
                        name="phoneNumber"
                        value={guest.phoneNumber}
                        placeholder={t("auth.form.placeholder.phoneNumber")}
                        onChange={handleChange}
                    />
                    <Form.Text>{t("auth.form.text.phoneNumber")}</Form.Text>
                </Form.Group>
                <Button
                    disabled={!isFormValid}
                    type="submit"
                    variant={!!errors ? "dark" : "primary"}
                >
                    {t("auth.form.submit.guest")}
                </Button>
                {
                    !isFormValid &&
                    <ErrorList
                        baseKeyTrad="auth.form"
                        errors={Object.entries(errors)?.reduce((acc, [name, labels]) => {
                            labels.forEach(label => {
                                acc.push([label, name])
                            })
                            return acc
                        }, [])}
                    />
                }
            </Form>
        </Container>
    )
}

export default GuestForm
