import React, { useEffect, useRef, useState } from 'react'
import { useMutation } from '@apollo/client'
import { Button, Col, Container, Form, Spinner } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
// import emailjs from "emailjs-com"
import { REGISTER_CUSTOMER_MUTATION } from '../../graphql/mutations/auth/registerUser.mutation'
import { registerCustomerMetaInput } from '../../graphql/inputs/user.input'
import { useContextApp } from "../../context/AppContext"
import { useFormValidation } from '../../hooks/useFormValidation'
import ErrorList from '../errors/ErrorList'
// import registerEmail from '../../template-email/registerEmail.template'
import "./Form.css"

const INITIAL_USER = {
    gender: "male",
    username: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    phoneNumber: ""
}

const RegisterForm = ({ handleClose, setCurrentAuthForm }) => {
    const { t, i18n } = useTranslation()
    const formRef = useRef()
    const {
        contextToast: [, setToast],
        contextAuth: [, { updateAuth }]
    } = useContextApp()

    const [user, setUser] = useState(INITIAL_USER)
    const [{ errors, isFormValid}, { handleInputTarget, updateErrors, setErrors }] = useFormValidation(formRef)
    // const [isFormValid, setIsFormValid] = useState(false)
    const [loading, setLoading] = useState(false)

    const [registerCustomerMeta] = useMutation(REGISTER_CUSTOMER_MUTATION, {
        onCompleted: data => {
            let registeredUser = { ...data.registerCustomerMeta.customer }
            registeredUser.metaData
                .map(meta => ({ [meta.key]: meta.value }))
                .forEach(meta => {
                    registeredUser = {
                        ...registeredUser,
                        ...meta
                    }
                })
            delete registeredUser["metaData"]
            updateAuth({
                user: registeredUser,
                token: data?.registerCustomerMeta?.authToken,
                refreshToken: data?.registerCustomerMeta?.refreshToken,
                isLogged: true,
                isGuest: false,
                guest: null
            })
            setToast({
                title: "Notification",
                body: t(`actions.toast.success.auth.register`, { name: user.username }),
                role: "success",
                target: "account"
            })
            setLoading(false)
            setUser(INITIAL_USER)
            setErrors(null)
            if (handleClose) {
                handleClose()
            }
        },
        onError: ({ graphQLErrors }) => {
            console.log(graphQLErrors);
            if (graphQLErrors?.find(err => err.message.includes("This username is already registered")) || graphQLErrors.find(err => err.message.includes("An account is already registered with that username"))) {
                updateErrors({ username: ["alreadyExist"] })
            }
            if (graphQLErrors?.find(err => err.message.includes("already registered")) || graphQLErrors.find(err => err.message.includes("An account is already registered with that email"))) {
                updateErrors({ email: ["alreadyExist"] })
            }
            // setIsFormValid(true)
            setLoading(false)
        }
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser(prevState => ({ ...prevState, [name]: value }))
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (isFormValid) {
            setLoading(true)
            registerCustomerMeta({
                variables: {
                    input: registerCustomerMetaInput(user.username, user.email, user.password, user.gender, i18n.language)
                }
            })
        }
    }

    useEffect(() => {
        if (user.email && user.confirmEmail && user.email === user.confirmEmail) {
            if (errors?.email.length && errors.email?.find(error => error === "diff")) {
                updateErrors({ email: errors?.email.filter(error => error !== "diff") })
            }
        }
        else {
            if (!errors?.email) {
                updateErrors({ email: ["diff"] })
            }
            else if (!errors.email?.find(error => error === "diff")) {
                updateErrors({ email: [...errors.email, "diff"] })
            }
        }

        if (user.password && user.confirmPassword && user.password === user.confirmPassword) {
            if (errors?.password.length) {
                updateErrors({ password: errors?.password.filter(error => error !== "diff") })
            }
        }
        else {
            if (!errors?.password) {
                updateErrors({ password: ["diff"] })
            }
            else if (!errors.password?.find(error => error === "diff")) {
                updateErrors({ password: [...errors.password, "diff"] })
            }
        }
    }, [user, errors, updateErrors])

    // useEffect(() => {
    //     if (!errors || (errors && !Object.values(errors).some(v => v.length))) {
    //         setIsFormValid(true)
    //     }
    //     else if (errors && !errors.username?.find(v => v === "alreadyExist") && !errors.email?.find(v => v === "alreadyExist") && Object.values(errors).some(v => v.length)) {
    //         setIsFormValid(false)
    //     }
    // }, [errors, setIsFormValid])

    return (
        <Container>
            <h5 className="text-center">{t("auth.createAccount")}</h5>
            <Form id="register-form" onSubmit={handleSubmit} ref={formRef} className="my-4" noValidate>
                <Form.Row className="mb-3 justify-content-around">
                    <Form.Check
                        inline
                        type="radio"
                        id="register-gender-male"
                        name="gender"
                        label={t("auth.form.label.gender.male")}
                        value="male"
                        checked={user.gender === "male"}
                        onChange={handleChange}
                    />
                    <Form.Check
                        inline
                        type="radio"
                        id="register-gender-female"
                        name="gender"
                        label={t("auth.form.label.gender.female")}
                        value="female"
                        checked={user.gender === "female"}
                        onChange={handleChange}
                    />
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="register-username">
                            {t("auth.form.label.username")}
                        </Form.Label>
                        <Form.Control
                            id="register-username"
                            tabIndex={1}
                            name="username"
                            aria-describedby="register-username"
                            value={user.username}
                            placeholder={t("auth.form.placeholder.username")}
                            onChange={handleChange}
                            onInput={e => handleInputTarget(e.target)}
                            autoFocus
                            required
                        />
                        <Form.Text id="register-username" muted>{t("auth.form.text.username")}</Form.Text>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="register-phoneNumber">
                            {t("auth.form.label.phoneNumber")}
                        </Form.Label>
                        <Form.Control
                            id="register-phoneNumber"
                            tabIndex={2}
                            type="tel"
                            name="phoneNumber"
                            aria-describedby="register-phoneNumber"
                            value={user.phoneNumber}
                            placeholder={t("auth.form.placeholder.phoneNumber")}
                            onChange={handleChange}
                        />
                        <Form.Text id="register-phoneNumber" muted>{t("auth.form.text.phoneNumber")}</Form.Text>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="register-email">
                            {t("auth.form.label.email")}
                        </Form.Label>
                        <Form.Control
                            id="register-email"
                            tabIndex={3}
                            name="email"
                            type="email"
                            value={user.email}
                            placeholder={t("auth.form.placeholder.email")}
                            onChange={handleChange}
                            onInput={e => handleInputTarget(e.target)}
                            required
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="register-confirmEmail">
                            {t("auth.form.label.confirmEmail")}
                        </Form.Label>
                        <Form.Control
                            id="register-confirmEmail"
                            tabIndex={4}
                            name="confirmEmail"
                            type="email"
                            value={user.confirmEmail}
                            placeholder={t("auth.form.placeholder.confirmEmail")}
                            onChange={handleChange}
                            onInput={e => handleInputTarget(e.target)}
                            required
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="register-password">
                            {t("auth.form.label.password")}
                        </Form.Label>
                        <Form.Control
                            id="register-password"
                            tabIndex={5}
                            name="password"
                            type="password"
                            pattern="(.*[A-Z].*)(.*\d.*)"
                            minLength={6}
                            value={user.password}
                            placeholder={t("auth.form.placeholder.password")}
                            onChange={handleChange}
                            onInput={e => handleInputTarget(e.target)}
                            required
                        />
                        <Form.Text id="register-password" muted>
                            {t("auth.form.text.password")}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="register-confirmPassword">
                            {t("auth.form.label.confirmPassword")}
                        </Form.Label>
                        <Form.Control
                            id="register-confirmPassword"
                            tabIndex={6}
                            name="confirmPassword"
                            type="password"
                            value={user.confirmPassword}
                            placeholder={t("auth.form.placeholder.confirmPassword")}
                            onChange={handleChange}
                            onInput={e => handleInputTarget(e.target)}
                            required
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row className="mt-3 mb-1">
                    <Col className="text-center">
                        <small>{t("auth.otherAccountInfo")}</small>
                    </Col>
                </Form.Row>
                <Button
                    type="submit"
                    disabled={!isFormValid || loading}
                    variant={!isFormValid || loading ? "secondary" : "primary"}
                    block
                >
                    {
                        loading ?
                            <div className="d-flex align-items-center justify-content-center">
                                <span className="mr-3">{t("actions.loading")}</span>
                                <Spinner animation="border" />
                            </div>
                            :
                            <span>{t("auth.form.submit.register")}</span>
                    }
                </Button>
            </Form>
            {
                !isFormValid &&
                <div className="my-2">
                    <ErrorList
                        baseKeyTrad="auth.form"
                        errors={Object.entries(errors)?.reduce((acc, [name, labels]) => {
                            labels?.length && labels.forEach(label => {
                                acc.push([label, name])
                            })
                            return acc
                        }, [])}
                        col={6}
                    />
                </div>
            }
            <div onClick={e => setCurrentAuthForm("login")}>
                <u className="text-muted pointer">{t("auth.switch.login")}</u>
            </div>
        </Container>
    )
}

export default RegisterForm
