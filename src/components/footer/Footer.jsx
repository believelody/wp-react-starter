import React from "react"
import FooterMenu from "./FooterMenu"
import "./Footer.css"
import NewsletterForm from "../forms/NewsletterForm"
import FooterContact from "./FooterContact"
import FooterSocialMedia from "./FooterSocialMedia"

const Footer = () => {
  return (
    <footer className={`box box-3`}>
      <div className=" bg-dark d-flex justify-content-around">
        <div className={`d-flex align-items-center`}>
          <FooterMenu />
        </div>
        <div className={`footer-newsletter`}>
          <NewsletterForm />
        </div>
        <div className={`d-flex align-items-center`}>
          <span className={`text-light font-weight-bold`}>&copy; We Lift UP 2020</span>
        </div>
        <div className={`d-flex align-items-center`}>
          <FooterContact />
        </div>
        <div className={`d-flex align-items-center`}>
          <FooterSocialMedia />
        </div>
      </div>
    </footer>
  )
}

export default Footer