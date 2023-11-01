import { useState,useEffect } from "react";
import { Toaster,toast } from "sonner";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";
import * as XLSX from 'xlsx';


import "./pages.css";
import "./ModalEstacion.css";

const Logs = () => {
  const {auth} = useAuth();
  if (!auth.isAuthenticated) {
    return null; // O puedes redirigir a una página de inicio de sesión
  }


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [datosLogs, setDatosLogs] = useState([])
  const [actualizarDatosLogs, setactualizarDatosLogs] =useState(false);

  const [idLog,setIdLog] = useState(null);
  const [mensajeLog,setMensajeLog] = useState("");

  //Excel
  const handleDescargarExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(datosLogs);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Logs");
    XLSX.writeFile(workbook, "Logs_Reservas.xlsx");
  };


  const handleActualizarLog = () =>{
    setactualizarDatosLogs(true);
    setIsModalOpen(false);
    toast.success('Logs actualizados');
  }

  const handleModificar = (id) => {
    const logSeleccionado = datosLogs.find(log=> log._id === id );
    if(logSeleccionado){
      setMensajeLog(logSeleccionado.mensaje);
    }
    setIsModalOpen(true);
    setIdLog(id);

    console.log(`modificio el ${id}`);
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      const response = await clienteAxios.patch(
        `/log/${idLog}`,
        {
          mensaje:mensajeLog
        }
      )
      console.log(response.data);
      if(response.data.logExistente){
        setIsModalOpen(false);
        setactualizarDatosLogs(true);
        setMensajeLog('');
        toast.success('Mensaje agregado correctamente');
      }

    } catch (error) {
      console.error(error);
       toast.error('Error en actualizar el mensaje');
    }
  }



  useEffect(() => {
    clienteAxios
      .get("/log")
      .then((response) => {
        setDatosLogs(response.data);
        //Almaceno aquí todos los nombres de las estaciones para validar que nadie crea una igual.
      })
      .catch((error) => {
        console.error("Error al hacer la petición:", error);
      });
      setactualizarDatosLogs(false);
  }, [actualizarDatosLogs]);

const logsFiltrados = datosLogs.filter(log => !log.cancelada);

  return (
    <div className="estaciones">
      <h2>Logs de Reservas</h2>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Estacion</th>
              <th>Equipo</th>
              <th>Contraseña</th>
              <th>Fecha</th>
              <th>Nombre</th>
              <th>DNI</th>
              <th>Email</th>
              <th>Telefono</th>
              <th>Anotaciones/Incidencias</th>
              <th>Agregar Anotaciones</th>
            </tr>
          </thead>
          <tbody>
            {logsFiltrados.map((log) => (
              <tr key={log._id}>
                <td>{log.nombreEstacion}</td>
                <td>{log.equipo ? "Sí" : "No"}</td>
                <td>
                  {log.contrasena ? log.contrasena : "No tiene equipo"}
                </td>
                <td>{log.fecha}</td>
                <td>{log.nombrePersona}</td>
                <td>{log.dniPersona}</td>
                <td>{log.emailPersona}</td>
                <td>{log.telefono}</td>
                <td>{log.mensaje ? log.mensaje : 'Vacío'}</td>
                <td>
                  <button onClick={() => handleModificar(log._id)}>
                    Agregar Anotacion
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-estacion">
          <div className="modal-content">
            {/* Resto del código del modal... */}
          </div>
        </div>
      )}

      <Toaster position="top-right" closeButton richColors/>

      <button onClick={handleActualizarLog}>Actualizar Logs</button>
      <button onClick={handleDescargarExcel}>Descargar Registros</button>
    </div>
  );
}

export default Logs