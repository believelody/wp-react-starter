import React, { useEffect, useRef, useState } from 'react'
import { useMutation } from '@apollo/client'
import { Button, Container, Form, Spinner } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useContextApp } from '../../context/AppContext'
import { LOGIN_USER_MUTATION } from '../../graphql/mutations/auth/loginUser.mutation'
import { loginUserInput } from '../../graphql/inputs/user.input'
import { useFormValidation } from '../../hooks/useFormValidation'
import ErrorList from '../errors/ErrorList'

const LoginForm = ({ handleClose, setCurrentAuthForm }) => {
  const { t } = useTranslation()
  const formRef = useRef()
  const {
    contextToast: [, setToast],
    contextAuth: [, { updateAuth }]
  } = useContextApp()

  const [user, setUser] = useState({ email: "", password: "" })
  const [{ errors, isFormValid }, { handleInputTarget, updateErrors, setErrors }] = useFormValidation(formRef)

  const [login, { loading }] = useMutation(LOGIN_USER_MUTATION, {
    onCompleted: data => {
      let loggedUser = { ...data.login.customer }
      loggedUser.metaData
        .map(meta => ({ [meta.key]: meta.value }))
        .forEach(meta => {
          loggedUser = {
            ...loggedUser,
            ...meta
          }
        })
      delete loggedUser["metaData"]
      setToast({
        title: "Notification",
        body: t(`actions.toast.success.auth.login`, { name: loggedUser.name || loggedUser.username }),
        role: "success",
        target: "account"
      })
      setErrors(null)
      setUser({ email: "", password: "" })
      updateAuth({
        user: loggedUser,
        token: data?.login.authToken,
        refreshToken: data?.login.refreshToken,
        isLogged: true,
        isGuest: false,
        guest: null
      })
      if (handleClose) {
        handleClose()
      }
    },
    onError: ({ graphQLErrors }) => {
      console.log(graphQLErrors);
      if (graphQLErrors.find(error => error.message === "invalid_email")) {
        updateErrors({ email: ["invalid"] })
      }
      if (graphQLErrors.find(error => error.message === "incorrect_password")) {
        updateErrors({ password: ["invalid"] })
      }
    }
  })

  const handleChange = e => {
    const { name, value } = e.target
    setUser(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (isFormValid) {
      login({
        variables: {
          input: loginUserInput(user.email, user.password)
        }
      })
    }
  }

  // useEffect(() => {
  //   if (!errors || (errors && !Object.values(errors).some(v => v.length))) {
  //     setIsFormValid(true)
  //   }
  //   else if (errors && !errors.password?.find(v => v === "invalid") && !errors.email?.find(v => v === "invalid") && Object.values(errors).some(v => v.length)) {
  //     setIsFormValid(false)
  //   }
  // }, [errors, setIsFormValid])

  return (
    <Container>
      <h5 className="text-center">{t("auth.notLogged")}</h5>
      <Form id="login-form" onSubmit={handleSubmit} ref={formRef} className="my-4" noValidate>
        <Form.Group>
          <Form.Label htmlFor="login-email">
            {t("auth.form.label.email")}
          </Form.Label>
          <Form.Control
            id="login-email"
            tabIndex={1}
            name="email"
            type="email"
            value={user.email}
            placeholder={t("auth.form.placeholder.email")}
            onChange={handleChange}
            onInput={e => handleInputTarget(e.target)}
            required
            autoFocus
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="login-password">
            {t("auth.form.label.password")}
          </Form.Label>
          <Form.Control
            id="login-password"
            tabIndex={2}
            type="password"
            name="password"
            value={user.password}
            placeholder={t("auth.form.placeholder.password")}
            onChange={handleChange}
            onInput={e => handleInputTarget(e.target)}
            required
          />
        </Form.Group>
        <Button
          type="submit"
          disabled={loading || !isFormValid}
          variant={isFormValid ? "primary" : "secondary"}
        >
          {
            loading ?
              <div className="d-flex align-items-center">
                <span className="mr-3">{t("actions.loading")}</span>
                <Spinner animation="border" />
              </div>
              :
              <span>{t("auth.form.submit.login")}</span>
          }
        </Button>
        {
          !isFormValid &&
          <div className="mt-2">
            <ErrorList
              baseKeyTrad="auth.form"
              errors={Object.entries(errors)?.reduce((acc, [name, labels]) => {
                labels.forEach(label => {
                  acc.push([label, name])
                })
                return acc
              }, [])}
            />
          </div>
        }
      </Form>
      <div onClick={() => setCurrentAuthForm("register")}>
        <u className="text-muted pointer">{t("auth.switch.register")}</u>
      </div>
      <div onClick={() => setCurrentAuthForm("forgottenPassword")}>
        <u className="text-muted pointer">{t("auth.switch.forgottenPassword")}</u>
      </div>
    </Container>
  )
}

export default LoginForm
