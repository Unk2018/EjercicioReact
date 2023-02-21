import React from "react";
import "../assets/css/bootstrap.min.css";
import Producto from "./Producto";

function ListaProductos({ setPrecioTotal }) {
  
  return (
    <div className="container mb-5">
      <div className="row row-cols-3">
        <Producto
          nombre="Jamón ibérico"
          precio="70"
          setPrecioTotal={setPrecioTotal}
          img={require(`../assets/img/jamon.jpg`)}
          descripcion="Paleta de bellota ibérica 100% pata negra procedente de cerdos ibéricos 100%, criados en libertad y alimentados con bellotas en montanera las dehesas de la Sierra de Huelva, actual Parque Natural Sierra de Aracena y Picos de Aroche. Paletilla de Huelva de la máxima pureza maduradas en secadero natural."
        />

        <Producto
          nombre="Pechuga de pollo"
          precio="10.99"
          setPrecioTotal={setPrecioTotal}
          img={require(`../assets/img/pechuga.jpg`)}
          descripcion="Bandeja de 2 medias pechugas de pollo certificado, con la calidad y sabor de un pollo criado a base de cereales. 
          Pollo certificado de raza Label. Con un periodo mínimo de 56 días de crianza. Su alimentación es 100% natural, basada en cereales (70%) y proteína de soja."
        />

        <Producto
          nombre="Atún"
          precio="2.25"
          setPrecioTotal={setPrecioTotal}
          img={require(`../assets/img/atun.jpg`)}
          descripcion="Las piezas de atún se seleccionan manualmente para garantizar su aspecto y sabor. El atún al natural garantiza la conservación del alto contenido proteico del pescado. El liquido de cobertura utilizado nos permite tomar un alimento de alto valor proteico con un bajo aporte en grasas, además de con un increíble sabor."
        />

        <Producto
          nombre="Uvas verdes"
          precio="5.90"
          setPrecioTotal={setPrecioTotal}
          img={require(`../assets/img/uvas.jpg`)}
          descripcion="Uvas amarillas muy dulces. Fruta muy rica en vitaminas B, C y en fibras. La característica principal de este producto es que no tiene semillas dentro. Origen: España"
        />

        <Producto
          nombre="Coliflor"
          precio="5.20"
          setPrecioTotal={setPrecioTotal}
          img={require(`../assets/img/coliflor.jpg`)}
          descripcion="Cogollos de coliflor de alta calidad, cultivados por una empresa familiar en el corazón de los fértiles campos de Flandes. Cantidad: 1 kg."
        />

        <Producto
          nombre="Zanahorias (1kg)"
          precio="2.76"
          setPrecioTotal={setPrecioTotal}
          img={require(`../assets/img/zanahorias.jpg`)}
          descripcion="Zanahorias frescas seleccionadas. Las más tiernas del mercado. Variedad: Naranja Calibre-peso aproximado unidad: 100 gramos Origen: Segovia (España) Categoría: Extra"
        />
      </div>
    </div>
  );
}

export default ListaProductos;
