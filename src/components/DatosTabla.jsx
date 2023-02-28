import React from "react";
import "../assets/css/bootstrap.min.css";
import "../assets/css/estilos.css";

function DatosTabla({ db, id }) {
  const eliminarDB = () => {
    var request;
    
    try {
      request = db
        .transaction("carrito", "readwrite")
        .objectStore("carrito")
        .delete(id.toString());

      // En el caso de que funciona
      request.onsuccess = function (event) {
        // Eliminado correctamente
        console.info("Eliminado");
      };
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <td>
      <button className="btn btn-danger delete" onClick={eliminarDB}>Eliminar</button>
    </td>
  );
}

export default DatosTabla;
