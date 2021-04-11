import React, { useEffect, useState } from "react"
import { Card, Fade } from "react-bootstrap"
import { faArrowUp, faTimes } from "@fortawesome/free-solid-svg-icons"
import { useContextApp } from "../../context/AppContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./Toast.css"

const Toast = () => {
    const {contextToast: [toast, setToast]} = useContextApp()
    const [open, setOpen] = useState(false)

    useEffect(() => {
        let timer
        if (toast) {
            setOpen(true)
            timer = setTimeout(() => {
                setOpen(false)
            }, toast?.duration || 5000)
        }
        return () => clearTimeout(timer);
    }, [toast, setOpen]);

    return (
        <Fade in={open} onExited={() => setToast(null)}>
            <div className={`position-fixed fixed-top ${toast ? "d-flex justify-content-center align-items-end" : "d-none"} bg-dark py-2 mt-5`}>
                <Card className="toast-card">
                    <Card.Header className="toast-card-header">
                        <span className={`bg-${toast?.role} p-3 rounded`}></span>
                        <strong className="ml-4 mr-auto">{toast?.title}</strong>
                        <FontAwesomeIcon
                            color="secondary"
                            icon={faTimes}
                            className="close-icon"
                            onClick={() => setToast(null)}
                        />
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            {toast?.body}
                        </Card.Text>
                    </Card.Body>
                </Card>
                {
                    toast?.target &&
                    <div id={`fixed-arrow-${toast.target}`}>
                        <FontAwesomeIcon color="white" icon={faArrowUp} />
                    </div>
                }
            </div>
        </Fade>
    )
}

export default Toast