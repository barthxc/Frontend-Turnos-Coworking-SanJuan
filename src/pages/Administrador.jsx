import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import "./pages.css";
import "./ModalEstacion.css";
import clienteAxios from "../config/axios";

const Administrador = () => {
  const [datosEstacionesReservas, setdatosEstacionesReservas] = useState([]);
  const [
    actualizarDatosEstacionesReservas,
    setActualizarDatosEstacionesReservas,
  ] = useState(false);
  const [estacionesExistentes, setEstacionesExistentes] = useState([]);

  //useStates para pasar datos {idEstacion , nombreEstacion , idReserva}
  const [selectedEstacion, setSelectedEstacion] = useState('');
  const [estacionSeleccionada, setEstacionSeleccionada] = useState(null);


  const reservasVacias = () =>{
    toast('No hay reservas para esta Estación',{
      action:{
        label:'Volver',
        onClick: () => setEstacionSeleccionada(null)
                    
      },
    })
    console.log('vacio');
  }

  const resetearFormulario = () => {};

  useEffect(() => {
    clienteAxios
      .get("/estaciones-con-reservas")
      .then((response) => {
        setdatosEstacionesReservas(response.data);
        //Almaceno aquí todos los nombres de las estaciones para validar que nadie crea una igual. SE DEBE QUITAR EN ADMNISTRADOR
        setEstacionesExistentes(
          response.data.map((estacion) => estacion.nombre)
        );
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error al hacer la petición:", error);
      });
    setActualizarDatosEstacionesReservas(false);
  }, [actualizarDatosEstacionesReservas]);

  const handleEliminar = (nombreReserva, nombreEstacion, idReserva) => {
    // Aquí puedes usar estacionId, nombreEstacion e idReserva para realizar la operación de eliminación
    console.log(idReserva);
    toast.error(`Seguro que desea eliminar la reserva de ${nombreReserva} de la estacion ${nombreEstacion}`,
    {
     action: {
       label: 'Eliminar',
       onClick: () => clienteAxios.delete(`/reservas/${idReserva}`)
       .then(response => {
         if (response.data.msg) {
          setActualizarDatosEstacionesReservas(true);
          setEstacionSeleccionada(null);
          setSelectedEstacion('');

           toast.success(`Reserva de ${nombreReserva} eliminada correctamente`);
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




  const handleChange = async (e) => {
    setSelectedEstacion(e.target.value); // Actualiza el estado con el nuevo valor seleccionado
    const idEstacion = e.target.value; // Obtiene el nuevo valor seleccionado
    console.log(idEstacion);
  
    try {
      const response = await clienteAxios.get(`/estaciones-reservas-id/${idEstacion}`);
      setEstacionSeleccionada(response.data); // Actualiza el estado con los nuevos datos obtenidos
      console.log(datosEstacionesReservas);
    } catch (error) {
      console.error('Error al obtener datos de la estación', error);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="estaciones">
      <h2>Administrador de Reservas</h2>

      <form>
      <select value={selectedEstacion} onChange={handleChange}>
        <option value="" disabled default>--Selecciona una estación--</option>
        {datosEstacionesReservas.map((estacion,index) => (
          <option key={estacion.idEstacion} value={estacion.idEstacion}>
            {estacion.nombreEstacion}
          </option>
        ))}
      </select>
    </form>
    <table>
  <thead>
    <tr>
      <th>Nombre Estacion</th>
      <th>Equipo</th>
      <th>Contraseña</th>
      <th>Fecha</th>
      <th>Nombre Cliente</th>
      <th>DNI</th>
      <th>Email</th>
      <th>Eliminar Reserva</th>
    </tr>
  </thead>
  <tbody>
  {estacionSeleccionada && estacionSeleccionada.reservas.length === 0 && (
  // Ejecuta código cuando estacionSeleccionada está definida y reservas está vacío
  reservasVacias()
)}


  {estacionSeleccionada
  ? estacionSeleccionada.reservas.map((reserva, reservaIndex) => {


      return (
        <tr key={reservaIndex}>
          {reservaIndex === 0 && (
            <>
              <td rowSpan={estacionSeleccionada.reservas.length}>
                {estacionSeleccionada.nombreEstacion}
              </td>
              <td rowSpan={estacionSeleccionada.reservas.length}>
                {estacionSeleccionada.equipo ? "Si" : "No"}
              </td>
              <td rowSpan={estacionSeleccionada.reservas.length}>
                {estacionSeleccionada.contrasena || "No tiene equipo"}
              </td>
            </>
          )}
          <td>{reserva.fecha}</td>
          <td>{reserva.nombre}</td>
          <td>{reserva.dni}</td>
          <td>{reserva.email}</td>
          <td>
            <button
              onClick={() =>
                handleEliminar(
                  reserva.nombre,
                  estacionSeleccionada.nombreEstacion,
                  reserva.idReserva
                )
              }
            >
              Eliminar
            </button>
          </td>
        </tr>
      );
    })
  : datosEstacionesReservas.map((estacion, index) =>
          estacion.reservas.map((reserva, reservaIndex) => (
            <tr key={reservaIndex}>
              {reservaIndex === 0 && (
                <>
                  <td rowSpan={estacion.reservas.length}>
                    {estacion.nombreEstacion}
                  </td>
                  <td rowSpan={estacion.reservas.length}>
                    {estacion.equipo ? "Si" : "No"}
                  </td>
                  <td rowSpan={estacion.reservas.length}>
                    {estacion.contrasena || "No tiene equipo"}
                  </td>
                </>
              )}
              <td>{reserva.fecha}</td>
              <td>{reserva.nombre}</td>
              <td>{reserva.dni}</td>
              <td>{reserva.email}</td>
              <td>
                <button
                  onClick={() =>
                    handleEliminar(
                      reserva.nombre,
                      estacion.nombreEstacion,
                      reserva.idReserva
                    )
                  }
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))
        )}
  </tbody>
</table>

      
      <Toaster position="top-right" closeButton richColors />
    </div>
  );
};

export default Administrador;
