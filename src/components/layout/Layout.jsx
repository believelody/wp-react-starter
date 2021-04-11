import React from 'react'
import Footer from '../footer/Footer'
import Header from '../header/Header'
import Loading from '../loading/Loading'
import Main from '../main/Main'
import Modal from '../modal/Modal'
import Toast from '../toast/Toast'
import "./Layout.css"

const Layout = ({children}) => {

  return (
    <div className="layout">
      <Header />
      <Main children={children} />
      <Loading />
      <Modal />
      <Toast />
      <Footer />
    </div>
  )
}

export default Layout
