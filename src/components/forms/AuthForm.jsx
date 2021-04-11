import React, { useState } from 'react'
import ForgottenPasswordForm from './ForgottenPasswordForm'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

const AuthForm = ({ handleClose = null }) => {
    const [currentAuthForm, setCurrentAuthForm] = useState("")

    const switchAuthForm = value => {
        switch (value) {
            case "login":
                return <LoginForm handleClose={handleClose} setCurrentAuthForm={setCurrentAuthForm} />
            case "register":
                return <RegisterForm handleClose={handleClose} setCurrentAuthForm={setCurrentAuthForm} />
            case "forgottenPassword":
                return <ForgottenPasswordForm handleClose={handleClose} setCurrentAuthForm={setCurrentAuthForm} />
        
            default:
                return <LoginForm handleClose={handleClose} setCurrentAuthForm={setCurrentAuthForm} />;
        }
    }

    return <div className="py-4">{switchAuthForm(currentAuthForm)}</div>
}

export default AuthForm
