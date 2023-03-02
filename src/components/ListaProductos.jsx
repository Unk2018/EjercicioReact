import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Producto from "./Producto";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

function ListaProductos() {
  var db = null;
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
      db = e.target.result;
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

  return (
    <>
      {" "}
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
              <li className="nav-item bg-primary p-2">
                <NavLink className="nav-link text-white" to="/productos">
                  Productos
                </NavLink>
              </li>
            </ul>

            <ul className="navbar-nav carrito mb-lg-0 d-flex align-items-center">
              <li className="nav-item">
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
      <div className="container mb-5">
        <div className="row row-cols-3">
          <Producto
            nombre="Jamón ibérico"
            precio="70"
            img={require(`../assets/img/jamon.jpg`)}
            imgDB="../assets/img/jamon.jpg"
            descripcion="Paleta de bellota ibérica 100% pata negra procedente de cerdos ibéricos 100%, criados en libertad y alimentados con bellotas en montanera las dehesas de la Sierra de Huelva, actual Parque Natural Sierra de Aracena y Picos de Aroche. Paletilla de Huelva de la máxima pureza maduradas en secadero natural."
          />

          <Producto
            nombre="Pechuga de pollo"
            precio="10.99"
            img={require(`../assets/img/pechuga.jpg`)}
            imgDB="../assets/img/pechuga.jpg"
            descripcion="Bandeja de 2 medias pechugas de pollo certificado, con la calidad y sabor de un pollo criado a base de cereales. 
          Pollo certificado de raza Label. Con un periodo mínimo de 56 días de crianza. Su alimentación es 100% natural, basada en cereales (70%) y proteína de soja."
          />

          <Producto
            nombre="Atún"
            precio="2.25"
            img={require(`../assets/img/atun.jpg`)}
            imgDB="../assets/img/atun.jpg"
            descripcion="Las piezas de atún se seleccionan manualmente para garantizar su aspecto y sabor. El atún al natural garantiza la conservación del alto contenido proteico del pescado. El liquido de cobertura utilizado nos permite tomar un alimento de alto valor proteico con un bajo aporte en grasas, además de con un increíble sabor."
          />

          <Producto
            nombre="Uvas verdes"
            precio="5.90"
            img={require(`../assets/img/uvas.jpg`)}
            imgDB="../assets/img/uvas.jpg"
            descripcion="Uvas amarillas muy dulces. Fruta muy rica en vitaminas B, C y en fibras. La característica principal de este producto es que no tiene semillas dentro. Origen: España"
          />

          <Producto
            nombre="Coliflor"
            precio="5.20"
            img={require(`../assets/img/coliflor.jpg`)}
            imgDB="../assets/img/coliflor.jpg"
            descripcion="Cogollos de coliflor de alta calidad, cultivados por una empresa familiar en el corazón de los fértiles campos de Flandes. Cantidad: 1 kg."
          />

          <Producto
            nombre="Zanahorias (1kg)"
            precio="2.76"
            img={require(`../assets/img/zanahorias.jpg`)}
            imgDB="../assets/img/zanahorias.jpg"
            descripcion="Zanahorias frescas seleccionadas. Las más tiernas del mercado. Variedad: Naranja Calibre-peso aproximado unidad: 100 gramos Origen: Segovia (España) Categoría: Extra"
          />
        </div>
      </div>
    </>
  );
}

export default ListaProductos;
