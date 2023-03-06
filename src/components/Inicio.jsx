import React from "react";
import { NavLink } from "react-router-dom";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.js";

function Inicio() {
  return (
    <>
      <nav className="navbar navbar-expand-sm nowrap col-12 p-0">
        <div className="container-fluid bg-primary bg-opacity-75">
          <NavLink className="navbar-brand" to="/">
            <img
              src={require(`../assets/img/logo.png`)}
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
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-lg-0 d-flex align-items-center">
              <li className="nav-item bg-primary p-2 w-100">
                <NavLink className="nav-link text-white" to="/">
                  Página principal
                </NavLink>
              </li>
              <li className="nav-item p-2">
                <NavLink className="nav-link text-white" to="/productos">
                  Productos
                </NavLink>
              </li>
            </ul>

            <ul className="navbar-nav carrito mb-lg-0 d-flex align-items-center">
              <li className="nav-item p-2">
                <NavLink className="nav-link text-white" to="/carrito">
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
      </nav>

      <div className="w-100 h-50 mb-5">
        <div className="col-12 d-flex justify-content-center">
          <div
            id="carouselExampleFade"
            className="carousel slide carousel-fade w-75"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src={require(`../assets/img/company.jpg`)}
                  className="d-block w-100"
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src={require(`../assets/img/escaparate.jpg`)}
                  className="d-block w-100"
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src={require(`../assets/img/tiendaLogo.jpg`)}
                  className="d-block w-100"
                  alt="..."
                />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleFade"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleFade"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        <h1 className="text-center mt-5 mb-4">
          ¡El Oasis presenta su tienda online!
        </h1>

        <div className="mt-5 row row-cols-2 me-3 ms-1">
          <div className="col-1"></div>
          <div className="col-12 col-sm-4 col-md-4 col-lg-4">
            <img
              src={require(`../assets/img/mercado.jpg`)}
              className="w-100 mt-4"
              alt=""
            />
          </div>

          <div className="col-12 col-sm-7 col-md-7 col-lg-7 text-center mt-4">
            <h4>¡Mira nuestro catálogo de productos!</h4>
            <p>
              La tienda online actúa como si fuera un
              catálogo de un supermercado. Te trae los productos de la tienda
              hasta tu vecindario.
            </p>

            <p>
              Solo tienes que llenar tu carrito y enviar el pago por los
              productos a comprar.
            </p>
          </div>
        </div>

        <div className="col-12 text-center container mt-4">
          <h4 className="fs-5">¡Envíos rápidos y seguros!</h4>
          <p>
            Enviamos productos frescos y refrigerados rápidamente, ¡por lo que
            no te preocupes de que te llegue el producto en mal estado!
          </p>
        </div>
      </div>
    </>
  );
}

export default Inicio;
