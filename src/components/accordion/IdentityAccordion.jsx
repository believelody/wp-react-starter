import React from 'react'
import { Button, Form, Jumbotron } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useContextApp } from '../../context/AppContext'
import AuthForm from '../forms/AuthForm'
import GuestForm from '../forms/GuestForm'
import IdentityText from '../identity/IdentityText'
import AccordionItem from './AccordionItem'

const IdentityAccordion = ({ index, activeIndex, setActiveIndex }) => {

  const { t } = useTranslation()
  const {
    contextAuth: [{ isLogged, isGuest, isGuestEdited, user, guest }, { updateAuth }],
  } = useContextApp()

  const handleEdited = isEdited => {
    updateAuth({ isGuestEdited: isEdited })
  }

  const handleSwitch = () => {
    updateAuth({
      isGuest: !isGuest,
      isGuestEdited: !isGuest ? true : guest ? false : true,
    })
  }

  return (
    <AccordionItem
      title={`4. ${t("cart.accordion.identity.label")}`}
      subtitle={t("cart.accordion.identity.subtitle")}
      activeIndex={activeIndex}
      index={index}
      setActiveIndex={setActiveIndex}
    >
      <Jumbotron className="px-3 py-0">
        {
          ((isGuest && guest) || (isLogged && user)) && !isGuestEdited &&
            <div className="py-3">
              <IdentityText handleEdited user={user || guest} />
            </div>
        }
        {
          isGuest && !isLogged && isGuestEdited &&
          <div className="py-3">
            <GuestForm handleEdited={handleEdited} />
          </div>
        }
        {
          !isGuest && !isLogged && <AuthForm />
        }
        {
          !isLogged &&
          <div className="pb-2 d-flex align-items-center justify-content-between">
            <Form.Check
              id="guest-switch"
              type="switch"
              label={t("cart.accordion.identity.guest")}
              value={isGuest}
              onChange={handleSwitch}
            />
            {
              isGuest && guest && !isGuestEdited && (
                <Button
                  variant="dark"
                  onClick={() => handleEdited(true)}
                >
                  Modifier mon identité
                </Button>
              )
            }
          </div>
        }
      </Jumbotron>
    </AccordionItem>
  )
}

export default IdentityAccordion
