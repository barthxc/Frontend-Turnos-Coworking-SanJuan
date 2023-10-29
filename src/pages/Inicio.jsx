import { useState, useEffect } from "react";
import Modal from "../components/Modal/Modal";
import Card from "../components/Card/Card";
import "./pages.css";
import clienteAxios from "../config/axios";

const Inicio = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [datosEstaciones, setdatosEstaciones] = useState([]);


  const [selectedItemId,setSelectedItemId] = useState(null);
  const [selectedNombreId, setSelectedNombreId] = useState(null);
  const [selectedEquipo,setSelectedEquipo] = useState(null);
  const [selectedContraseña,setSelectedContraseña] = useState(null);

  const openModal = (id, nombre, equipo, contraseña) => {
    setIsModalOpen(true);
    setSelectedItemId(id);
    setSelectedNombreId(nombre);
    setSelectedEquipo(equipo);
    setSelectedContraseña(contraseña);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    clienteAxios
      .get(`/inicio`)
      .then((response) => {
        setdatosEstaciones(response.data);
      })
      .catch((error) => {
        console.error("Error al hacer la petición:", error);
      });
  }, []);

  //Este use effect para cuando cambie el estado del modal a open
  //De esta manera se actualizarán los datos de la reserva y podre manejar
  //en el modal algunas validaciones 


  return (
    <div className="container">
      {datosEstaciones.map((item) => (
        <Card
          openModal={() => openModal(item._id, item.nombre, item.equipo,item.contrasena)}
          key={item._id}
          id={item._id}
          nombre={item.nombre}
          equipo={item.equipo}
          psw={item.contrasena}
        />
      ))}
      {isModalOpen && (
        <Modal
          id={selectedItemId}
          onClose={closeModal}
          nombreEstacion={selectedNombreId}
          tieneEquipo={selectedEquipo}
          contrasena={selectedContraseña}
        />
      )}
    </div>
  );
};

export default Inicio;
