import { useState,useEffect } from "react";
import { Toaster,toast } from "sonner";
import clienteAxios from "../config/axios";
const Logs = () => {
  const [datosLogs, setDatosLogs] = useState([])
  const [actualizarDatosLogs, setactualizarDatosLogs] =useState(false);

  const handleActualizarLog = () =>{
    setactualizarDatosLogs(true);
    toast.success('Logs actualizados');
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

  console.log(datosLogs);

  return (
    <div className="estaciones">
      <h2>Estaciones</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre de la Estacion</th>
            <th>Equipo</th>
            <th>Contraseña</th>
            <th>Fecha</th>
            <th>NombrePersona</th>
            <th>dniPersona</th>
            <th>emailPersona</th>
          </tr>
        </thead>
        <tbody>
          {datosLogs.map((log) => (
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
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleActualizarLog}>Actualizar Logs</button>
      <Toaster position="top-right" closeButton richColors/>
    </div>
  )
}

export default Logs