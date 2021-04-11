import React from 'react'
import { Navbar, Nav as NavMenu, Form, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import {Link} from "react-router-dom"
import CartNav from "./CartNav"
import DropdownCategories from '../dropdown/DropdownCategories'
import DropdownSelectLang from '../dropdown/DropdownSelectLang'
import AuthNav from './AuthNav'
import "./Nav.css"

const Nav = () => {
  const {t} = useTranslation()
  return (
    <Navbar bg="dark" className="d-flex">
      <Link to="/">
        <Navbar.Brand className="text-light">
            WooReact
        </Navbar.Brand>
      </Link>
      {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}

      <NavMenu as="ul">
        <NavMenu.Item as="li">
          <DropdownCategories />
        </NavMenu.Item>
        <NavMenu.Item as="li">
          <Link to="/">
            <span className="nav-link text-light">{t(`navbar.about`)}</span>
          </Link>
        </NavMenu.Item>
        <NavMenu.Item as="li">
          <Link to="/">
            <span className="nav-link text-light">{t(`navbar.blog`)}</span>
          </Link>
        </NavMenu.Item>
      </NavMenu>

      <div className="mx-4 d-flex flex-grow-1">
        <Form.Control placeholder={t(`navbar.search.placeholder`)} className="mr-sm-2" />
        <Button variant="outline-light">{t(`navbar.search.btnLabel`)}</Button>
      </div>

      <NavMenu>
        <NavMenu.Item className={`mr-4`}>
          <DropdownSelectLang />
        </NavMenu.Item>
        <NavMenu.Item className="bg-light">
          <Link to="/cart">
            <div className="nav-link">
              <CartNav />
            </div>
          </Link>
        </NavMenu.Item>
        <NavMenu.Item className={`d-flex align-items-center ml-3`}>
          <AuthNav />
        </NavMenu.Item>
      </NavMenu>
    </Navbar>
  )
}

export default Nav
