import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.js";

function Inicio() {
  return (
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
            Creado por Alex, esta tienda online actúa como si fuera un catálogo
            de un supermercado. Te trae los productos de la tienda hasta tu
            vecindario.
          </p>

          <p>
            Solo tienes que llenar tu carrito y enviar el pago por los productos
            a comprar.
          </p>
        </div>
      </div>

      <div className="col-12 text-center container mt-4">
        <h4 className="fs-5">¡Envíos rápidos y seguros!</h4>
        <p>
          Enviamos productos frescos y refrigerados rápidamente, ¡por lo que no
          te preocupes de que te llegue el producto en mal estado!.
        </p>
      </div>
    </div>
  );
}

export default Inicio;
