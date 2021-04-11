import React from 'react'
import { Spinner } from 'react-bootstrap'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./Loading.css"
import { useContextApp } from '../../context/AppContext'

const Loading = () => {
  const { contextLoading: [loading] } = useContextApp()
  return (
    loading &&
    <div className="spinner-container">
      <Spinner as="div" role="status" animation="border" className="spinner-loading" />
      <div>
          <span className={`mr-2 loading-text`}>WE</span>
          <span className={`arrow-animate`}>
              <FontAwesomeIcon icon={faArrowUp} size="2x" />
          </span>
      </div>
    </div>
  )
}

export default Loading
