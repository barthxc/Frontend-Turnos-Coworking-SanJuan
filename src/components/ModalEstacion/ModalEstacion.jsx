import { useState } from "react";
import axios from "axios";
import Alerta from "../Alerta/Alerta";

const ModalEstacion = ({  onClose, isEdicion, selectedEstacionId }) => {
  const [nombre, setNombre] = useState("");
  const [tieneEquipo, setTieneEquipo] = useState(false);
  const [contrasena, setContrasena] = useState("");
  const [alerta,setAlerta] = useState({});


  //SUBMIT + VALIDACIOENS
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!nombre){
        setAlerta({ msg: "Campos vacios",error:true });
        return
    }

    let dataToSend = {
      nombre: nombre,
      equipo: tieneEquipo,
      contraseña: contrasena
    };
  
    if (contrasena === "") {
      // Si la contraseña está vacía, omitimos el campo contraseña
      dataToSend = {
        nombre: nombre,
        equipo: tieneEquipo
      };
    }
    
    try {
      let response;
  
      if (isEdicion) {
        // Lógica para modificar una estación
        response = await axios.put(`http://localhost:4000/api/estaciones/${selectedEstacionId}`, dataToSend);
      } else {
        // Lógica para agregar una nueva estación
        response = await axios.post("http://localhost:4000/api/estaciones", dataToSend);
      }
  
      if (response.data.success) {
        setAlerta({ msg: "Cambios realizados correctamente" });
      } else {
        setAlerta({ msg: "Error con la Estacion", error:true });
      }
    } catch (error) {
        console.error(error);
        setAlerta({ msg: "Error al comunicarse con el servidor", error: true });
    }
    // Cierra el modal
  };
  
  
  

    const { msg } = alerta;

  return (
    <div className="modal-estacion">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Agregar Estación</h2>
        {msg && <Alerta alerta={alerta} />}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Equipo:</label>
            <div className="radio-buttons">
              <label>
                <input
                  type="radio"
                  name="tieneEquipo"
                  checked={tieneEquipo}
                  onChange={() => setTieneEquipo(true)}
                />
                SI
              </label>
              <label>
                <input
                  type="radio"
                  name="tieneEquipo"
                  checked={!tieneEquipo}
                  onChange={() => setTieneEquipo(false)}
                />
                NO
              </label>
            </div>
          </div>

          {tieneEquipo && (
            <div className="form-group">
              <label htmlFor="contrasena">Contraseña:</label>
              <input
                type="text"
                id="contrasena"
                name="contrasena"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
              />
            </div>
          )}

          <button type="submit">Agregar</button>
        </form>
      </div>
    </div>
  );
};

export default ModalEstacion;
