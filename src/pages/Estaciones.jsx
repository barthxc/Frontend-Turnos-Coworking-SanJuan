import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import "./pages.css";
import "./ModalEstacion.css";
import Alerta from "../components/Alerta/Alerta";
import clienteAxios from "../config/axios";

const Estaciones = () => {


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [datosEstaciones, setdatosEstaciones] = useState([]);
  const [isEdicion, setIsEdicion] = useState(false);
  const [selectedEstacionId, setSelectedEstacionId] = useState(null);
  const [actualizarDatosEstaciones, setActualizarDatosEstaciones] =useState(false);
  const [estacionesExistentes, setEstacionesExistentes] = useState([]);

  const [alerta, setAlerta] = useState({});

  const [nombre, setNombre] = useState("");
  const [tieneEquipo, setTieneEquipo] = useState(true);
  const [contrasena, setContrasena] = useState("");

  const resetearFormulario = () => {
    setNombre("");
    setTieneEquipo(false);
    setContrasena("");
  };

  useEffect(() => {
    clienteAxios
      .get("/inicio")
      .then((response) => {
        setdatosEstaciones(response.data);
        //Almaceno aquí todos los nombres de las estaciones para validar que nadie crea una igual.
        setEstacionesExistentes(
          response.data.map((estacion) => estacion.nombre)
        );
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error al hacer la petición:", error);
      });
    setActualizarDatosEstaciones(false);
  }, [actualizarDatosEstaciones]);

  const handleEliminar = (id, nombre) => {
    console.log(id);
    toast.error(`Seguro que desea eliminar la estación ${nombre}`,
     {
      action: {
        label: 'Eliminar',
        onClick: () => clienteAxios.delete(`/estaciones/${id}`)
        .then(response => {
          if (response.data.msg) {
            setActualizarDatosEstaciones(true);
            toast.success(`Estación ${nombre} eliminada correctamente`);
          } else {
            toast.error('Error al eliminar la estación');
          }
        })
        .catch(error => {
          console.error(error);
          toast.error('Error al comunicarse con el servidor');
          
        })
      },
    })
  }

  const handleModificar = (id) => {
    const estacionSeleccionada = datosEstaciones.find(estacion => estacion._id === id);
    console.log(estacionSeleccionada);
    if (estacionSeleccionada) {
      setNombre(estacionSeleccionada.nombre);
      setTieneEquipo(estacionSeleccionada.equipo);
      setContrasena(estacionSeleccionada.contrasena || ''); // Asegúrate de manejar el caso de contraseña nula o indefinida
    }
    setAlerta({});
    setIsModalOpen(true);
    setIsEdicion(true);
    setSelectedEstacionId(id);
    console.log(`modificio el ${id}`);
  };

  const handleAgregar = () => {
    setAlerta({});
    setIsModalOpen(true);
    setIsEdicion(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre) {
      setAlerta({ msg: "Campos vacios", error: true });
      return;
    }

    if (tieneEquipo && !contrasena) {
      setAlerta({ msg: "La contraseña es obligatoria si hay equipo", error: true });
      return;
    }

    try {
      let response;

      if (isEdicion) {
        console.log("Modifico un coso");
        response = await clienteAxios.patch(
          `/estaciones/${selectedEstacionId}`,
          {
            nombre: nombre,
            equipo: tieneEquipo,
            contrasena: tieneEquipo ? contrasena : '',
          }
        );
      } else {

        if (estacionesExistentes.includes(nombre)) {
          setAlerta({ msg: "Ya existe una estación con ese nombre", error: true });
          return;
        }

        console.log("Creo un coso nuevo");
        response = await clienteAxios.post("/estaciones", {
          nombre: nombre,
          equipo: tieneEquipo,
          contrasena: contrasena,
        });
      }

      if (response.data.estacion) {
        setAlerta({ msg: "Cambios realizados correctamente" });
        resetearFormulario();
        setIsModalOpen(false);
        setActualizarDatosEstaciones(true);
        toast.success(isEdicion ? 'Estación modificada con éxito' : 'Estación creada con éxito');

      } else {
        setAlerta({ msg: "Error con la Estacion", error: true });
      }
    } catch (error) {
      console.error(error);
      setAlerta({ msg: "Error al comunicarse con el servidor", error: true });
    }
  };

  const { msg } = alerta;

  return (
    <div className="estaciones">
      <h2>Estaciones</h2>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Equipo</th>
              <th>Contraseña</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {datosEstaciones.map((estacion) => (
              <tr key={estacion._id}>
                <td>{estacion.nombre}</td>
                <td>{estacion.equipo ? "Sí" : "No"}</td>
                <td>
                  {estacion.contrasena ? estacion.contrasena : "No tiene equipo"}
                </td>
                <td>
                  <button onClick={() => handleModificar(estacion._id)}>
                    Modificar
                  </button>
                  <button
                    onClick={() => handleEliminar(estacion._id, estacion.nombre)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={handleAgregar}>Agregar Estación</button>
      <Toaster position="top-right" closeButton richColors />
      {isModalOpen && (
        <div className="modal-estacion">
          <div className="modal-content">
            <span className="close" onClick={() => setIsModalOpen(false)}>
              &times;
            </span>
            <h2>{isEdicion ? "Editar Estación" : "Añadir Nueva Estación"}</h2>
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
                      onChange={() => {
                        setTieneEquipo(true);
                        setContrasena("");
                      }}
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
                    onChange={(e) => setContrasena(e.target.value || null)}
                  />
                </div>
              )}

              <button type="submit">{isEdicion ? 'Modificar' : 'Crear'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Estaciones;
