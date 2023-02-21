import { useState } from "react";
import "./App.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/estilos.css";
import ListaProductos from "./components/ListaProductos";
import ListaCarrito from "./components/ListaCarrito";
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";

function App() {
  const [precioTotal, SetPrecioTotal] = useState(0);

  return (
    <div className="App">
      <nav className="navbar navbar-expand-sm nowrap bg-body-tertiary col-12">
        <BrowserRouter>
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Navbar
            </a>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Página principal
                  </NavLink>
                </li>
              </ul>
              <NavLink to="/carrito">Carrito</NavLink>
            </div>
          </div>

          <Routes>
            <Route
              path="/"
              element={<ListaProductos setPrecioTotal={SetPrecioTotal} />}
            ></Route>
            <Route path="/carrito" element={<ListaCarrito />}></Route>
            {/* Sale cuando hay errores (no encuentra elemento en esa ruta) */}
            <Route
              path="*"
              element={
                <div className="mt-5">
                  <h1>Error 404</h1>
                </div>
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      </nav>

      <h1>Total a pagar: {precioTotal}€</h1>
    </div>
  );
}

export default App;
