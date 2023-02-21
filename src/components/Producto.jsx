import React from "react";
import "../assets/css/bootstrap.min.css";
import "../assets/css/estilos.css";
import { useState } from "react";

function Producto({ nombre, precio, setPrecioTotal, img, descripcion }) {
  // Los enlaza automáticamente aunque solo en pares. Deja de cojerlo bien si hay 3, pero enlaza el 3 con
  // el 4 si hay
  const [cantidad, SetCantidad] = useState(0);

  const modificarCantidad = (e) => {
    SetCantidad(e.target.value);
  };

  const addCant = () => {
    setPrecioTotal((total) => total + precio * cantidad);
  };

  return (
    <div className="col-12 col-sm-6 col-md-6 col-lg-4 mb-5">
      <div className="card mt-5 h-100">
        <div className="card-body productBody">
          <div className="card-title">
            <img src={img} className="img-fluid rounded" alt="..." />
          </div>

          <h3>{nombre}</h3>
          <p className="card-text">{precio} €</p>

          <p className="fst-italic text-wrap">{descripcion}</p>
        </div>

        <div className="card-footer input-group mb-2">
          <input
            type="number"
            className="form-control text-end"
            value={cantidad}
            onChange={modificarCantidad}
          />

          <button className="btn btn-success h-100" onClick={addCant}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-cart-plus-fill me-1 mb-1"
              viewBox="0 0 16 16"
            >
              <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Producto;
