import React from "react";
import "../assets/css/bootstrap.min.css";
import { useState, useEffect } from "react";

function ListaCarrito() {
  var [db, setDb] = useState(0);
  var openRequest = null;
  var [total, setTotal] = useState(0);

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

          contenido += "</tr>";

          costeTotal += cursor.value.cantidad * cursor.value.coste;
          contador++;

          cursor.continue();

          // Si ya no hay, entonces se sale y mete a la tabla todos los datos existentes
        } else {
          contenido += "<tr>";

          setTotal(costeTotal.toFixed(2));

          contenido += "<th></th>";
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
    var objectStore = db.transaction("carrito", "readwrite").objectStore("carrito");
    var objectClear = null;

    try {
      objectClear = objectStore.clear();

      objectClear.onsuccess = () => {
        console.log("Se ha limpiado carrito");
      };
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mb-5 mt-5 justify-content-end">
      <div className="table-responsive col-12">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Coste</th>
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
        onClick={clearCarrito}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-paypal mb-1 me-2"
          viewBox="0 0 16 16"
        >
          <path d="M14.06 3.713c.12-1.071-.093-1.832-.702-2.526C12.628.356 11.312 0 9.626 0H4.734a.7.7 0 0 0-.691.59L2.005 13.509a.42.42 0 0 0 .415.486h2.756l-.202 1.28a.628.628 0 0 0 .62.726H8.14c.429 0 .793-.31.862-.731l.025-.13.48-3.043.03-.164.001-.007a.351.351 0 0 1 .348-.297h.38c1.266 0 2.425-.256 3.345-.91.379-.27.712-.603.993-1.005a4.942 4.942 0 0 0 .88-2.195c.242-1.246.13-2.356-.57-3.154a2.687 2.687 0 0 0-.76-.59l-.094-.061ZM6.543 8.82a.695.695 0 0 1 .321-.079H8.3c2.82 0 5.027-1.144 5.672-4.456l.003-.016c.217.124.4.27.548.438.546.623.679 1.535.45 2.71-.272 1.397-.866 2.307-1.663 2.874-.802.57-1.842.815-3.043.815h-.38a.873.873 0 0 0-.863.734l-.03.164-.48 3.043-.024.13-.001.004a.352.352 0 0 1-.348.296H5.595a.106.106 0 0 1-.105-.123l.208-1.32.845-5.214Z" />
        </svg>
        Comprar por Paypal
      </button>
    </div>
  );
}

export default ListaCarrito;
