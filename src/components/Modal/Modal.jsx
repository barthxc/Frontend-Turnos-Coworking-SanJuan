import { useState, useEffect } from "react";
import "./Modal.css";
import axios from "axios"; // Importa Axios
import { Toaster, toast } from 'sonner'
import Alerta from "../Alerta/Alerta"; // Importa tu componente Alerta

const Modal = ({ id, onClose, nombreEstacion, tieneEquipo, contrasena }) => {
  const [estacionId, setEstacionId] = useState(null);
  const [datosReservas, setdatosReserva] = useState([]);
  const [fechasDisponibles, setFechasDisponibles] = useState([]);
  const [nombre, setNombre] = useState("");
  const [dni, setDni] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState("");
  const [alerta, setAlerta] = useState({});

  const resetearFormulario = () => {
    setNombre("");
    setDni("");
    setEmail("");
    setFecha("");
    const select = document.getElementById("fechas");
    select.value = "";
  };


  const obtenerDatos = async () => {
    try {
      // Obtener reservas
      const reservasResponse = await axios.get(`http://localhost:4000/api/reservas/${id}`);
      setdatosReserva(reservasResponse.data);

      // Obtener fechas disponibles
      const fechas = obtenerFechasDisponibles();
      setFechasDisponibles(fechas);

      console.log(nombreEstacion);
      console.log(tieneEquipo);
      console.log(contrasena);

      console.log(id);
      console.log(reservasResponse.data);
    } catch (error) {
      console.log("Error al hacer la petición", error);
    }
  };



  useEffect(() => {
    obtenerDatos();
  
    if (id !== null) {
      obtenerDatos();
    }
  }, [id]);

  //Este use effect para cuando cambie el estado del modal a open
  {
    /**
useEffect(() => {
  if (estacionId) {
    console.log('cambiooo');
    // Verifica si selectedItemId está definido
    axios
    .get(`http://localhost:4000/api/reservas/${estacionId}`)
    .then((response) => {
      setdatosReserva(response.data);
    })
    .catch((error) => {
      console.log("Error al hacer la petición", error);
    });
  }
}, [estacionId]);
*/
  }

  //MANEJO DE FECHAS:



  //OBTENER FECHAS DISPONIBLES
  const obtenerFechasDisponibles = () => {
    const fechas = [];
    const hoy = new Date(); // Obtiene la fecha y hora actual
  
    let contadorDias = 0;
    let dia = hoy; // Inicia desde hoy
  
    // Comprueba si es fin de semana y ajusta el primer día si es necesario
    if (dia.getDay() === 6) {
      dia.setDate(dia.getDate() + 2); // Si es sábado, salta al lunes
    } else if (dia.getDay() === 0) {
      dia.setDate(dia.getDate() + 1); // Si es domingo, salta al lunes
    }
  
    let hora = (hoy.getHours() < 8 && hoy.getDate() === dia.getDate()) ? hoy.getHours() : 8;
  
    while (contadorDias < 3) {
  
      while (hora <= 18) {
        const nuevaFecha = new Date(dia);
        nuevaFecha.setHours(hora, 0, 0, 0);
        fechas.push(nuevaFecha);
        
        hora++;
      }
  
      contadorDias++;
      dia.setDate(dia.getDate() + 1); // Pasa al siguiente día
      hora = 8; // Reinicia la hora para el siguiente día
    }
  
    return fechas;
  };

  //Formateamos la fecha
  const formatearFecha = (fecha) => {
    const dia = fecha.getDate().toString().padStart(2, "0");
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
    const año = fecha.getFullYear();
    const hora = fecha.getHours().toString().padStart(2, "0");
    const minutos = fecha.getMinutes().toString().padStart(2, "0");

    return `${dia}-${mes}-${año} ${hora}:${minutos}`;
  };

  //CONVIRTIENDO FECHAS PARA EL SUBMIT
  {
    /* CREO QUE ESTO NO ES NECESARIO POR AHORA
const fechaReserva = new Date(fecha);
const fechaActual = new Date();
const fechaISO = fechaActual.toISOString().split("T")[0];
*/
  }
  //SUBMIT + VALIDACIOENS
  const handleSubmit = async (e) => {
    e.preventDefault();

    {
      /**
    console.log(datosReservas); //ESTOS DATOS PARA ELIMINAR OPTIONS
  */
    }
    console.log(id); //Guardar para uso
    console.log(nombreEstacion); //Guardar para uso
    console.log(fecha);

    //Que no haya campos vacios
    if ([fecha, nombre, dni, email].includes("")) {
      setAlerta({ msg: "Hay campos vacios", error: true });
      return;
    }

    // Validar que la fecha seleccionada no esté deshabilitada por html hack
    

    //Controlar que tengo un id estacion para poder hacer la reserva
    if (!id) {
      setAlerta({ msg: "Hubo un error. Inténtalo más tarde", error: true });
      return;
    }

    try {
      // Enviar los datos al servidor para guardarlos
      const response = await axios.post("http://localhost:4000/api/inicio", {
        id,
        fecha,
        nombre,
        dni,
        email,
      });

      const responseLog = await axios.post("http://localhost:4000/api/log",{
        nombreEstacion,
        equipo:tieneEquipo,
        contrasena,
        fecha,
        nombrePersona:nombre,
        dniPersona:dni,
        emailPersona:email
      });

      // Verificar si la reserva se guardó correctamente
      if (response.data.reserva && responseLog.data.log) {
        toast.success('Reserva guardada correctamente. Revisa tu correo');
        resetearFormulario();
        obtenerDatos();

      } else {
        setAlerta({ msg: "Error al guardar la reserva", error: true });
      }
    } catch (error) {
      console.error(error);
      setAlerta({ msg: "Error al comunicarse con el servidor", error: true });
    }
  };

  const { msg } = alerta;

  return (
    <>
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Reserva {nombreEstacion}</h2>
        {msg && <Alerta alerta={alerta} />}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">DNI:</label>
            <input
              type="text"
              id="dni"
              name="dni"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo electrónico:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="fecha">Fecha:</label>
            <select
              id="fechas"
              name="fechas"
              onChange={(e) => setFecha(e.target.value)}
            >
              <option value="" disabled selected>
                --Seleccione una fecha--
              </option>
              {fechasDisponibles.map((fecha, index) => {
                const formattedFecha = formatearFecha(fecha);
                const fechaReservada = datosReservas.some(
                  (reserva) => reserva.fecha === formattedFecha
                );

                return (
                  <option
                    key={index}
                    value={formattedFecha}
                    disabled={fechaReservada}
                    className={fechaReservada ? "reservada" : ""}
                  >
                    {formattedFecha}
                  </option>
                );
              })}
            </select>
          </div>

          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
    <Toaster position="top-right" closeButton richColors />
    </>
  );
};

export default Modal;
