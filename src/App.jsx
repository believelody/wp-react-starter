import React from "react"
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import Helmet from "react-helmet"
import i18n from "./translation/i18n"
import { AppProvider } from "./context/AppContext"
import Layout from "./components/layout/Layout"
import HomePage from "./pages/HomePage"
import ProductSinglePage from "./pages/ProductSinglePage"
import CartPage from "./pages/CartPage"
import CategoriesPage from "./pages/CategoriesPage"
import CategorySinglePage from "./pages/CategorySinglePage"
import NotFound from "./components/not-found/NotFound"

const App = () => {

  return (
    <BrowserRouter basename="/wordpress">
      <AppProvider>
        <Helmet>
          <html lang={i18n.language} />
        </Helmet>
          <Layout>
            <Switch>
              <Redirect exact path="/" to="/home" />
              <Route exact path="/home" component={HomePage} />
              <Route exact path="/cart" component={CartPage} />
              <Route exact path="/categories" component={CategoriesPage} />
              <Route exact path="/categories/:slug" component={CategorySinglePage} />
              {
                ["/home", "/cart", "/categories/:slug"].map(route => (
                  <Route exact key={route} path={`${route}/:slug`} component={ProductSinglePage} />
                ))
              }
              <Route component={NotFound} />
            {/* <Route exact path="/product/:slug" component={ProductSinglePage} /> */}
            </Switch>
          </Layout>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
