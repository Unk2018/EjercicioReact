import React from "react";
import "../assets/css/bootstrap.min.css";
import "../assets/css/estilos.css";
import { useState, useEffect } from "react";

function Producto({ nombre, precio, img, descripcion }) {
  // Los enlaza automáticamente aunque solo en pares. Deja de cojerlo bien si hay 3, pero enlaza el 3 con
  // el 4 si hay
  const [cantidad, SetCantidad] = useState(1);
  var [db, setDb] = useState(0);
  var openRequest = null;

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
    };
  }, []);

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

  const modificarCantidad = (e) => {
    if (e.target.value.toString() === "") {
      SetCantidad(1);
    } else if (e.target.value < 1) {
      SetCantidad(1);
    } else {
      SetCantidad(e.target.value);
    }
  };

  const addCant = () => {
    comprobarCarro();
  };

  const addCarrito = () => {
    // BD carrito
    let carrito = db.transaction("carrito", "readwrite").objectStore("carrito");
    let producto = null;
    let request = null;

    try {
      // Crear usuario
      producto = {
        image: { img }.img,
        nombre: { nombre }.nombre,
        cantidad: { cantidad }.cantidad,
        coste: { precio }.precio,
      };

      // Comprueba que esté bien validado antes de introducir los datos
      // Añadir usuario
      request = carrito.add(producto); // (3)

      request.onsuccess = function () {
        // Cuando se introduce correctamente(4)
        console.log("Producto agregado al carro", request.result);
      };

      request.onerror = function () {
        console.error("Hay un error", request.error);
      };
    } catch (error) {
      console.error(error);
    }
  };

  const comprobarCarro = () => {
    // BD carrito
    let objectStore = db.transaction("carrito").objectStore("carrito");
    var cursor;
    var encontrado = false;

    try {
      // Abre los datos obtenidos. Cuando lo hace correctamente, recorrerá los datos
      objectStore.openCursor().onsuccess = (event) => {
        cursor = event.target.result;

        // Si hay datos
        if (cursor) {
          // Si encuentra el producto
          if (
            cursor.value.nombre === { nombre }.nombre &&
            cursor.value.coste === { precio }.precio
          ) {
            encontrado = true;
            sumarCantidad(cursor.value.id, cursor.value.cantidad);
          }
          cursor.continue();
        } else {
          if (encontrado === false) {
            addCarrito();
          }
        }
      };
    } catch (error) {
      console.error(error);
    }
  };

  // Suma al producto existente la cantidad añadida
  const sumarCantidad = (id, cantidadActual) => {
    var objectStore = db
      .transaction("carrito", "readwrite")
      .objectStore("carrito");
    var request;
    var data;
    var requestUpdate;

    try {
      // Coge el objeto de la id indicada
      request = objectStore.get(id);

      request.onerror = (event) => {
        // Handle errors!
        console.info("Se ha producido un error!");
      };

      // En el caso de que consigue los datos de la id indicada
      request.onsuccess = (event) => {
        // Coge los antiguos valores del dato correspondiente
        data = request.result;
        // Define los nuevos valores del dato seleccionado
        data.image = { img }.img;
        data.nombre = { nombre }.nombre;
        data.cantidad = parseFloat(cantidad) + parseFloat(cantidadActual);
        data.coste = { precio }.precio;

        // Actualiza los datos por unos nuevos
        requestUpdate = objectStore.put(data);

        requestUpdate.onerror = () => {
          // Hubo un error a la hora de actualizar los datos
          console.info("no se puede modificar");
        };

        requestUpdate.onsuccess = (event) => {
          // Cuando se ha actualizado correctamente
          console.info("modificado!");
        };
      };
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="col-12 col-sm-6 col-md-6 col-lg-4 mb-5">
      <div className="card mt-5 h-100">
        <div className="header">
          <div className="card-title">
            <img src={img} className="img-fluid rounded" alt="..." />
          </div>
          
          <h1>{nombre}</h1>
          <p className="card-text fs-3">{precio} €</p>
        </div>

        <div className="card-body productBody">
          <p className="fst-italic text-wrap">{descripcion}</p>
        </div>

        <div className="card-footer input-group mb-2">
          <input
            type="number"
            className="form-control text-end"
            value={cantidad}
            onChange={modificarCantidad}
            min="1"
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
            Añadir al carro
          </button>
        </div>
      </div>
    </div>
  );
}

export default Producto;
