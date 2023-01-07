// Dependencias necesarias de la APP
import "whatwg-fetch";
import "promise-polyfill/src/polyfill";
// Estilos de la APP
import "../assets/scss/main.scss";

import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { hot } from "react-hot-loader/root";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

// Layout de la APP
import AppLayout from "./components/layout";
import NotFound from "./pages/404";
import Configuration from "./pages/configuration";
import Dashboard from "./pages/dashboard";
// Páginas
import Login from "./pages/login";
import Users from "./pages/users";
import UsersSingle from "./pages/users/_single";

// para desabilitar todos los console log en prod
function noop() {}
if (process.env.NODE_ENV !== "development") {
  console.log = noop;
  console.warn = noop;
  console.error = noop;
}

const AppRoute = ({
  component: Component,
  layout: Layout,
  ...params // De ser necesario parametros personalizados a la vista, se los pasa
}) => (
  <Route
    {...params}
    render={props => {
      return localStorage.getItem("token") ? ( // Valido si existe token para que acceda a la vista
        <Layout title={params.title} history={props.history}>
          <Component {...props} />
        </Layout>
      ) : (
        // Redireciono para que no pueda ingresar a la vista si no se encuentra logeado(TOKEN)
        <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
      );
    }}
  />
);

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <BrowserRouter>
        <>
          <Switch>
            <AppRoute
              exact
              path="/"
              layout={AppLayout}
              component={Dashboard}
              title="Vista Inicio"
            />
            <AppRoute
              path="/configuration"
              layout={AppLayout}
              component={Configuration}
              title="Vista de configuración"
            />
            <AppRoute
              path="/users"
              layout={AppLayout}
              component={Users}
              title="Vista de usuarios"
            />
            <AppRoute
              path="/user/:id"
              layout={AppLayout}
              component={UsersSingle}
              title="Vista interna de usuarios"
            />
            {/* Es una vista propia, o sea sin layout */}
            <Route path="/login" component={Login} />
            <Route component={NotFound} />
          </Switch>
        </>
      </BrowserRouter>
    </AppContainer>,
    document.getElementById("app")
  );
};

render();

hot("./App", () => {
  render();
});
