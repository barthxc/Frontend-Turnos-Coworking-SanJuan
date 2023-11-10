import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import clienteAxios from "../../config/axios";
import './Menu.css';

import useAuth from "../../hooks/useAuth";

function Menu() {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const { auth, setAuth } = useAuth();

  const handleNavigation = (route) => {
    navigate(route);
  };

  const handleLogout =  () =>{
    setAuth({isAuthenticated:false, user:null});
    navigate('/');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!usuario || !contrasena) {
      toast.error(`Campos vacios`);
      return;
    }
    try {
      const response = await clienteAxios.post("/login", {
        usuario,
        contrasena,
      });
      const data = response.data;
      if (data.mensaje === "Login exitoso") {
        setAuth({ isAuthenticated: true, user: data.admin }); // Actualiza el estado de autenticación
        toast.success(data.mensaje);
        setIsModalOpen(false);
      } else {
        toast.error('Credenciales incorrectas');
      }
    } catch (error) {
      toast.error('Hubo un error intentelo de nuevo');
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
        <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow mb-5">
          <div className="container">
            <a href="" className="navbar-brand">
              <img src="./logo.png" alt="IMAGEN" />
            </a>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mx-auto">
                       <li className="nav-item">
                        <button className="nav-link" onClick={() => handleNavigation("/")}>Inicio</button>
                       </li>
                       <li className="nav-item ">
                        <button className="nav-link" onClick={() => handleNavigation("/reserva")}>Estaciones</button>
                       </li>
                      {auth.isAuthenticated && (
                      <>
                      <li className="nav-item">
                        <button className="nav-link admin" onClick={() => handleNavigation("/estaciones")}>Crear Estaciones</button>
                      </li>
                      <li className="nav-item">
                       <button className="nav-link admin" onClick={() => handleNavigation("/administrador")}>Administrador</button>
                      </li>
                      <li className="nav-item">
                        <button className="nav-link admin" onClick={() => handleNavigation("/logs")}>Logs</button>
                      </li>
                      </>
            )}
            </ul>

            <div className="navbar-nav">
            {!auth.isAuthenticated ? (
              <button className="btn btn-outline-success img-fluid" onClick={openModal}>Login</button>
            ) : (
              <button className="btn btn-outline-danger img-fluid" onClick={handleLogout}>Logout</button>
            )}
            </div>
                </div>
          </div>
          </nav>

      {isModalOpen && (
        <div className="modal-estacion">
          <div className="modal-content">
            <span className="close" onClick={() => setIsModalOpen(false)}>
              &times;
            </span>
            <h2>Ingresar</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="nombre">Usuario:</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value || "")}
                />
              </div>

              <div className="form-group">
                <label htmlFor="nombre">Contraseña:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value || "")}
                />
              </div>

              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      )}
      <Toaster position="top-right" closeButton richColors />
      </div>
  );
}

export default Menu;
