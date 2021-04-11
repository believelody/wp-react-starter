import React from 'react'
import { Container as ContainerBs } from "react-bootstrap"
import "./Container.css"

const Container = ({ children, classNames = "" }) => {
  return (
    <ContainerBs className={"bg-container " + classNames}>
      {children}
    </ContainerBs>
  )
}

export default Container
