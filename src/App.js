import { useState } from "react";
import "./App.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/estilos.css";
import ListaProductos from "./components/ListaProductos";
import ListaCarrito from "./components/ListaCarrito";
import Footer from "./components/Footer";
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";

function App() {
  const [isNavbarExpanded, setNavbarExpand] = useState(false);

  const navBarExpand = () => {
    var navbar = document.getElementById("navbarSupportedContent");

    if (
      window.innerWidth < 576 &&
      { isNavbarExpanded }.isNavbarExpanded === false
    ) {
      setNavbarExpand(true);
      navbar.style.display = "block";
    } else {
      setNavbarExpand(false);
      navbar.style.display = "none";
    }
  };

  return (
    <div className="App">
      <nav className="navbar navbar-expand-sm nowrap col-12 p-0">
        <BrowserRouter>
          <div className="container-fluid bg-primary bg-opacity-75">
            <NavLink className="navbar-brand" to="/">
              <img
                src={require(`./assets/img/logo.png`)}
                alt="Logo"
                className="imgLogo d-inline-block align-top"
              />
            </NavLink>

            <button
              className="navbar-toggler bg-primary-subtle"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={navBarExpand}
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink
                    className="nav-link text-white"
                    to="/"
                    onClick={navBarExpand}
                  >
                    Página principal
                  </NavLink>
                </li>
              </ul>

              <ul className="navbar-nav me-3 mb-2 mb-lg-0 d-flex">
                <li className="nav-item">
                  <NavLink
                    className="nav-link text-white"
                    to="/carrito"
                    onClick={navBarExpand}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="white"
                      className="bi bi-cart-fill me-1 mb-1 svgCarrito"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    </svg>
                    <span className="textCarrito">Carrito</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>

          <Routes>
            <Route path="/" element={<ListaProductos />}></Route>
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
      <Footer></Footer>
    </div>
  );
}

export default App;
