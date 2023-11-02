import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import useAuth from "./hooks/useAuth"; // Importa el hook useAuth
import Inicio from "./pages/Inicio";
import Menu from "./components/Menu/Menu";
import Administrador from "./pages/Administrador";
import Logs from "./pages/Logs";
import Estaciones from "./pages/Estaciones";
import Landing from "./pages/Landing";
import Footer from "./components/Footer/Footer";

const PrivateRoute = ({ element }) => {
  const { auth } = useAuth(); // Utiliza el hook useAuth para obtener el contexto de autenticación

  return auth.isAuthenticated ? (
    element
  ) : (
    <Navigate to="/" replace />
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <AuthProvider>
        <Menu />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/reserva" element={<Inicio />} />

          {/* Rutas privadas */}
          <Route
            path="/estaciones"
            element={<PrivateRoute element={<Estaciones />} />} // Usa PrivateRoute para proteger la ruta
          />
          <Route
            path="/administrador"
            element={<PrivateRoute element={<Administrador />} />} // Usa PrivateRoute para proteger la ruta
          />
          <Route
            path="/logs"
            element={<PrivateRoute element={<Logs />} />} // Usa PrivateRoute para proteger la ruta
          />
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
);
