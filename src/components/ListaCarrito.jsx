import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import { useState, useEffect } from "react";
import FormPay from "./FormPay";
import { NavLink } from "react-router-dom";

function ListaCarrito() {
  var [db, setDb] = useState(0);
  var openRequest = null;

  const iniciarBD = (db) => {
    let store;

    try {
      openRequest.onupgradeneeded = (e) => {
        // se dispara si el cliente no tiene la base de datos
        db = openRequest.result;

        switch (
          e.oldVersion // versión de db existente
        ) {
          case 0:
            // version 0 significa que el cliente no tiene base de datos
            // ejecutar inicialización
            db = openRequest.result;
            if (!db.objectStoreNames.contains("carrito")) {
              // si no hay un almacén de usuarios

              store = db.createObjectStore("carrito", {
                keyPath: "id",
                autoIncrement: true,
              });
              store.createIndex("image", "image", {
                unique: false,
              });
              store.createIndex("nombre", "nombre", {
                unique: false,
              });
              store.createIndex("cantidad", "cantidad", {
                unique: false,
              });
              store.createIndex("coste", "coste", {
                unique: false,
              });

              console.info("creamos carrito!");
            } else {
              console.info("tenemos carrito!");
            }
            break;

          // En el caso de una tabla que ya existe
          case 1:
            // el cliente tiene la versión 1
            // actualizar
            //let deleteRequest = indexedDB.deleteDatabase(name)
            //db.deleteObjectStore('usuarios')
            break;

          default:
            console.info("Acción default iniciarBD");
            break;
        }
      };
    } catch (error) {
      console.error(error);
    }
  };

  // Lo hace antes de montarlo
  useEffect(() => {
    openRequest = window.indexedDB.open("idbdwec", 1);

    iniciarBD(db);

    // Cuando se crea la base de datos te dice si lo ha conseguido o no
    openRequest.onerror = (e) => {
      console.error("Error", e);
    };

    openRequest.onsuccess = (e) => {
      // Crea tabla si no existe
      try {
        setDb(e.target.result);
      } catch (error) {
        console.log(error);
      }

      // continúa trabajando con la base de datos usando el objeto db
      console.info("tenemos bd!");

      // Consulta para rellenar tabla
      consultarInicialDB(e.target.result);
    };
  }, []);

  const consultarInicialDB = (dbEvent) => {
    // Abre usuarios y guarda sus datos
    var listado = document.getElementById("listaCarrito");
    var objectStore = dbEvent.transaction("carrito").objectStore("carrito");
    var cursor;
    var contenido = "";
    var costeTotal = 0;

    try {
      // Abre los datos obtenidos. Cuando lo hace correctamente, recorrerá los datos
      objectStore.openCursor().onsuccess = function (event) {
        cursor = event.target.result;

        // Si hay datos, entonces añade
        if (cursor) {
          contenido += "<tr>";

          // Introduce imagen dependiendo del producto (url de la imagen)
          if (cursor.value.image === "../assets/img/jamon.jpg") {
            contenido +=
              "<th scope='row'><img class='w-75' src=" +
              require(`../assets/img/jamon.jpg`) +
              "/></th>";
          } else if (cursor.value.image === "../assets/img/pechuga.jpg") {
            contenido +=
              "<th scope='row'><img class='w-75' src=" +
              require(`../assets/img/pechuga.jpg`) +
              "/></th>";
          } else if (cursor.value.image === "../assets/img/atun.jpg") {
            contenido +=
              "<th scope='row'><img class='w-75' src=" +
              require(`../assets/img/atun.jpg`) +
              "/></th>";
          } else if (cursor.value.image === "../assets/img/uvas.jpg") {
            contenido +=
              "<th scope='row'><img class='w-75' src=" +
              require(`../assets/img/uvas.jpg`) +
              "/></th>";
          } else if (cursor.value.image === "../assets/img/coliflor.jpg") {
            contenido +=
              "<th scope='row'><img class='w-75' src=" +
              require(`../assets/img/coliflor.jpg`) +
              "/></th>";
          } else if (cursor.value.image === "../assets/img/zanahorias.jpg") {
            contenido +=
              "<th scope='row'><img class='w-75' src=" +
              require(`../assets/img/zanahorias.jpg`) +
              "/></th>";
          }

          contenido += "<td>" + cursor.value.nombre + "</td>";
          contenido += "<td>" + cursor.value.cantidad + "</td>";
          contenido += "<td>" + cursor.value.coste + " €</td>";

          contenido +=
            "<td>" +
            "<button class='btn btn-outline-primary' onclick='lessCant(" +
            cursor.value.id +
            "," +
            cursor.value.cantidad +
            "," +
            cursor.value.coste +
            ")'>" +
            "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-arrow-left' viewBox='0 0 16 16' >" +
            "<path d='M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z' />" +
            "</svg>" +
            "</button>" +
            "<button class='btn btn-outline-primary' onclick='moreCant(" +
            cursor.value.id +
            "," +
            cursor.value.cantidad +
            "," +
            cursor.value.coste +
            ")'>" +
            "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-arrow-right' viewBox='0 0 16 16' >" +
            "<path d='M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z' />" +
            "</svg>" +
            "</button>" +
            "<button class='btn btn-danger' onclick='eliminar(" +
            cursor.value.id +
            ")'>" +
            "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-trash-fill' viewBox='0 0 16 16'>" +
            "<path d='M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z'/>" +
            "</svg></button></td>";
          contenido += "</tr>";

          costeTotal += cursor.value.cantidad * cursor.value.coste;

          cursor.continue();

          // Si ya no hay, entonces se sale y mete a la tabla todos los datos existentes
        } else {
          contenido += "<tr>";

          contenido += "<th></th>";
          contenido += "<td></td>";
          contenido += "<td></td>";
          contenido += "<th>Total:</th>";
          contenido += "<th>" + costeTotal.toFixed(2) + " €</th>";
          contenido += "</tr>";

          listado.innerHTML = contenido;
          console.log("¡No hay más registros disponibles!");
        }
      };
    } catch (error) {
      console.log(error);
    }
  };

  const consultarDB = () => {
    // Abre usuarios y guarda sus datos
    var listado = document.getElementById("listaCarrito");
    var objectStore = db.transaction("carrito").objectStore("carrito");
    var cursor;
    var contenido = "";
    var costeTotal = 0;
    var contador = 1;

    try {
      // Abre los datos obtenidos. Cuando lo hace correctamente, recorrerá los datos
      objectStore.openCursor().onsuccess = function (event) {
        cursor = event.target.result;

        // Si hay datos, entonces añade
        if (cursor) {
          contenido += "<tr>";

          contenido += "<th scope='row'>" + contador + "</th>";
          contenido += "<td>" + cursor.value.nombre + "</td>";
          contenido += "<td>" + cursor.value.cantidad + "</td>";
          contenido += "<td>" + cursor.value.coste + " €</td>";
          contenido += "<td></td>";
          contenido += "</tr>";

          costeTotal += cursor.value.cantidad * cursor.value.coste;
          contador++;

          cursor.continue();

          // Si ya no hay, entonces se sale y mete a la tabla todos los datos existentes
        } else {
          contenido += "<tr>";

          contenido += "<th></th>";
          contenido += "<td></td>";
          contenido += "<td></td>";
          contenido += "<th>Total:</th>";
          contenido += "<th>" + costeTotal.toFixed(2) + " €</th>";
          contenido += "</tr>";

          listado.innerHTML = contenido;
          console.log("¡No hay más registros disponibles!");
        }
      };
    } catch (error) {
      console.log(error);
    }
  };

  const clearCarrito = () => {
    // Abre usuarios y guarda sus datos
    var objectStore = db
      .transaction("carrito", "readwrite")
      .objectStore("carrito");
    var objectClear = null;

    try {
      objectClear = objectStore.clear();

      objectClear.onsuccess = () => {
        console.log("Se ha limpiado carrito");
        consultarDB();
      };
    } catch (error) {
      console.log(error);
    }
  };

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
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/">
                  Página principal
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/productos">
                  Productos
                </NavLink>
              </li>
            </ul>

            <ul className="navbar-nav carrito mb-lg-0 d-flex align-items-center">
              <li className="nav-item bg-primary p-2 w-100">
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

      <div className="container mb-5 mt-5 justify-content-end">
        <div className="table-responsive col-12">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Coste</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>

            <tbody id="listaCarrito"></tbody>
          </table>
        </div>

        <button
          className="btn btn-danger me-1 col-12 col-lg-2 col-md-3 col-sm-4 mt-2 p-2"
          onClick={clearCarrito}
        >
          <svg
            className="bi bi-cart-x-fill mb-1 me-2"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7.354 5.646 8.5 6.793l1.146-1.147a.5.5 0 0 1 .708.708L9.207 7.5l1.147 1.146a.5.5 0 0 1-.708.708L8.5 8.207 7.354 9.354a.5.5 0 1 1-.708-.708L7.793 7.5 6.646 6.354a.5.5 0 1 1 .708-.708z" />
          </svg>
          Vaciar carro
        </button>

        <button
          className="btn btn-success me-1 col-12 col-lg-3 col-md-4 col-sm-5 mt-2 p-2"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-stripe mb-1 me-2"
            viewBox="0 0 16 16"
          >
            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Zm6.226 5.385c-.584 0-.937.164-.937.593 0 .468.607.674 1.36.93 1.228.415 2.844.963 2.851 2.993C11.5 11.868 9.924 13 7.63 13a7.662 7.662 0 0 1-3.009-.626V9.758c.926.506 2.095.88 3.01.88.617 0 1.058-.165 1.058-.671 0-.518-.658-.755-1.453-1.041C6.026 8.49 4.5 7.94 4.5 6.11 4.5 4.165 5.988 3 8.226 3a7.29 7.29 0 0 1 2.734.505v2.583c-.838-.45-1.896-.703-2.734-.703Z" />
          </svg>
          Comprar por Stripe
        </button>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  fill="#5184FF"
                  className="bi bi-stripe mb-1 me-2"
                  viewBox="0 0 16 16"
                >
                  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Zm6.226 5.385c-.584 0-.937.164-.937.593 0 .468.607.674 1.36.93 1.228.415 2.844.963 2.851 2.993C11.5 11.868 9.924 13 7.63 13a7.662 7.662 0 0 1-3.009-.626V9.758c.926.506 2.095.88 3.01.88.617 0 1.058-.165 1.058-.671 0-.518-.658-.755-1.453-1.041C6.026 8.49 4.5 7.94 4.5 6.11 4.5 4.165 5.988 3 8.226 3a7.29 7.29 0 0 1 2.734.505v2.583c-.838-.45-1.896-.703-2.734-.703Z" />
                </svg>
                <button
                  type="button"
                  className="btn-close me-3"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body">
                <div className="container p-4">
                  <div className="row">
                    <div className="col-12">
                      <FormPay db={db} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListaCarrito;
