import React from 'react'
import { faSignInAlt, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { useContextApp } from '../../context/AppContext'
import AuthForm from '../forms/AuthForm'
import VerificationForm from '../forms/VerificationForm'

const AuthNav = () => {
    const history = useHistory()
    const { t } = useTranslation()
    const {
        contextAuth: [{ isLogged, user }, { logout }],
        contextModal: [, setModal]
    } = useContextApp()

    const handleModal = () => {
        setModal({
            dismiss: t("actions.button.cancel"),
            title: <h2>{t("actions.modal.auth.title")}</h2>,
            body: ({ handleClose }) => <AuthForm handleClose={handleClose} />,
        })
    }

    const handleClick = () => {
        if (user?.isVerified === "true") {
            // history.push(`/account/${user.id}`)
            logout()
        }
        else {
            setModal({
                dismiss: t("actions.button.cancel"),
                title: t("auth.verificationCode.title"),
                subtitle: t("auth.verificationCode.subtitle"),
                body: ({ handleClose }) => <VerificationForm handleClose={handleClose} />,
            })
        }
    }

    return (
        <OverlayTrigger
            placement={"bottom"}
            overlay={
                <Tooltip id={`tooltip-login`}>
                    {t(`navbar.account.tooltip.${isLogged ? "logged" : "notLogged"}`)}
                </Tooltip>
            }
        >
            {
                isLogged ?
                    <FontAwesomeIcon
                        className="text-light pointer"
                        size="lg"
                        icon={faUser}
                        onClick={handleClick}
                    />
                    :
                    <FontAwesomeIcon
                        className={`text-light pointer`}
                        size={"lg"}
                        icon={faSignInAlt}
                        onClick={handleModal}
                    />
            }
        </OverlayTrigger>
    )
}

export default AuthNav
