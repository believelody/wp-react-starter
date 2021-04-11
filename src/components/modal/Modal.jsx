import React from "react"
import { Modal as ModalBs, Button } from "react-bootstrap"
import { useContextApp } from "../../context/AppContext"

const Modal = () => {
  const {contextModal: [modal, setModal]} = useContextApp()
  const Component = modal?.body

  const handleAction = () => {
    if (modal?.action) {
      modal.action.method()
      setModal(null)
    }
  }

  return (
    <ModalBs
      show={!!modal}
      onHide={() => setModal(null)}
      aria-labelledby="modalLabel"
      size={modal?.size || "lg"}
      backdrop={modal?.static ? "static" : true}
      centered
    >
      <ModalBs.Header closeButton={!modal?.static}>
        <div className="d-block">
          <ModalBs.Title>
            {modal?.title}
          </ModalBs.Title>
          {
            modal?.subtitle && <p>{modal?.subtitle}</p>
          }
        </div>
      </ModalBs.Header>
      <ModalBs.Body>
        {!!Component && <Component handleClose={() => setModal(null)} />}
      </ModalBs.Body>
      {
        modal?.action &&
        <ModalBs.Footer>
          <Button variant="secondary" onClick={() => setModal(null)}>{modal?.dismiss || "Close"}</Button>
          <Button onClick={handleAction} variant={modal?.action.role} >{modal?.action.text}</Button>
        </ModalBs.Footer>
      }
    </ModalBs>
  )
}

export default Modal
