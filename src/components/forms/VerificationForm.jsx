import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useContextApp } from '../../context/AppContext'
import { resendCodeInput, verifyCustomerInput } from '../../graphql/inputs/user.input'
import { VERIFY_CUSTOMER_MUTATION, RESEND_CODE_MUTATION } from '../../graphql/mutations/auth/verifyCustomer.mutation'
import ErrorList from '../errors/ErrorList'

const VerificationForm = ({ handleClose }) => {
    const { t } = useTranslation()
    const {
        contextToast: [, setToast],
        contextAuth: [{ user }, { updateAuth }]
    } = useContextApp()
    const [code, setCode] = useState("")
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    const [isResend, setIsResend] = useState(false)

    const [verifyCustomer] = useMutation(VERIFY_CUSTOMER_MUTATION, {
        onCompleted: data => {
            updateAuth({
                user: {
                    ...user,
                    isVerified: data.verifyCustomer.isVerified
                }
            })
            setToast({
                title: "Notification",
                body: t(`actions.toast.success.auth.verified`, { name: user.username }),
                role: "success",
                target: "account"
            })
            setLoading(false)
            setCode("")
            setErrors(null)
            if (handleClose) {
                handleClose()
            }
        },
        onError: ({ graphQLErrors }) => {
            console.log(graphQLErrors);
            if (graphQLErrors[0].message === "invalid") {
                setErrors({ code: ["invalid"] })
            }
            setLoading(false)
        }
    })

    const [resendCode] = useMutation(RESEND_CODE_MUTATION, {
        onCompleted: data => {
            if (data.resendCode.isResend) {
                setIsResend(true)
                setCode("")
                setErrors(null)
            }
        },
        onError: ({ graphQLErrors }) => {
            console.log(graphQLErrors);
            if (graphQLErrors[0].message === "fail-resend") {
                setErrors({ code: ["fail-resend"] })
            }
            setLoading(false)
        }
    })

    const handleResend = () => {
        resendCode({
            variables: {
                input: resendCodeInput(user.id)
            }
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        setLoading(true)
        verifyCustomer({
            variables: {
                input: verifyCustomerInput(user.id, code)
            }
        })
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label htmlFor="code">{t("auth.form.label.code")}</Form.Label>
                    <Form.Control
                        name="code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                    <Form.Text id="verification-code" muted>{t("auth.form.text.code")}</Form.Text>
                </Form.Group>
                <Button
                    type="submit"
                    disabled={code.length < 6 || loading}
                    variant={code.length < 6 ? "dark" : "primary"}
                >
                    {t("actions.button.validate")}
                </Button>
            </Form>
            {
                errors &&
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
            <div className={`mt-3`}>
                {
                    isResend ?
                    <span className="text-info">{t("auth.verificationCode.codeResent")}</span>
                    :
                    <u onClick={handleResend} className="text-muted pointer">{t("auth.verificationCode.resend")}</u>
                }
            </div>
        </Container>
    )
}

export default VerificationForm
