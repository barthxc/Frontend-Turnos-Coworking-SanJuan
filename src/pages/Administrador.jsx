import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import "./pages.css";
import "./ModalEstacion.css";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";


export default function Administrador(){
  const {auth} = useAuth();
  if (!auth.isAuthenticated) {
    return null; 
  }

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
        onClick: () => {
          setEstacionSeleccionada(null);
          setSelectedEstacion('');
        }
                    
      },
    })
    console.log('vacio');
  }



  useEffect(() => {
    clienteAxios
      .get("/estaciones-con-reservas")
      .then((response) => {
        //Se filtra todas las reservas de forma que aparezca solo las fechas de hoy + la del día de ayer
        const estacionesFiltradas = response.data.map(estacion => {
          const reservasFuturas = estacion.reservas.filter(reserva => {
            const fechaReservaString = reserva.fecha;
            const [fechaParte, horaParte] = fechaReservaString.split(' ');
  
            const [dia, mes, anio] = fechaParte.split('-');
            const [hora, minutos] = horaParte.split(':');
  
            const fechaReserva = new Date(anio, mes - 1, dia, hora, minutos);
  
            const fechaActual = new Date();
            fechaActual.setHours(fechaActual.getHours() - 10); // Restar 10 horas
            return fechaReserva >= fechaActual;
          });
          console.log(reservasFuturas);
          return {
            ...estacion,
            reservas: reservasFuturas
          };
        })

        setdatosEstacionesReservas(estacionesFiltradas);
        
        
                
        
                /*Almaceno aquí todos los nombres de las estaciones para validar que nadie crea una igual. SE DEBE QUITAR EN ADMNISTRADOR
                setEstacionesExistentes(
                  response.data.map((estacion) => estacion.nombre)
                );
                console.log(response.data);
                */

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
  setSelectedEstacion(e.target.value);

  try {
    const response = await clienteAxios.get(`/estaciones-reservas-id/${e.target.value}`);
    
    const estacionConReservasFuturas = {
      ...response.data,
      reservas: response.data.reservas.filter(reserva => {
        const fechaReservaString = reserva.fecha;
        const [fechaParte, horaParte] = fechaReservaString.split(' ');

        const [dia, mes, anio] = fechaParte.split('-');
        const [hora, minutos] = horaParte.split(':');

        const fechaReserva = new Date(anio, mes - 1, dia, hora, minutos);

        const fechaActual = new Date();
        fechaActual.setHours(fechaActual.getHours() - 10); 
        return fechaReserva >= fechaActual;
      })
    };

    setEstacionSeleccionada(estacionConReservasFuturas);
  } catch (error) {
    console.error('Error al obtener datos de la estación', error);
  }
};

  



  return (
    <div className="estaciones">
      <h2>Administrador de Reservas</h2>

      <form>
        <select value={selectedEstacion} onChange={handleChange}>
          <option value="" disabled default>
            --Selecciona una estación--
          </option>
          {datosEstacionesReservas.map((estacion, index) => (
            <option key={estacion.idEstacion} value={estacion.idEstacion}>
              {estacion.nombreEstacion}
            </option>
          ))}
        </select>
      </form>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nombre Estacion</th>
              <th>Equipo</th>
              <th>Contraseña</th>
              <th>Fecha</th>
              <th>Nombre Cliente</th>
              <th>DNI</th>
              <th>Email</th>
              <th>Telefono</th>
              <th>Eliminar Reserva</th>
            </tr>
          </thead>
          <tbody>
            {estacionSeleccionada && estacionSeleccionada.reservas.length === 0 && (
              <tr>
                <td colSpan="9">No hay reservas para esta estación</td>
              </tr>
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
                      <td>{reserva.telefono}</td>
                      <td>
                        <button
                          onClick={() =>
                            handleEliminar(
                              reserva._id,
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
                      <td>{reserva.telefono}</td>
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
      </div>

      <Toaster position="top-right" closeButton richColors />
    </div>
  );
};

