import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//Autentificación
import { AuthProvider } from "./context/AuthProvider";
//Páginas - Componentes
import Inicio from "./pages/Inicio";
import Menu from "./components/Menu/Menu";
import Administrador from "./pages/Administrador";
import Logs from "./pages/Logs";
import Estaciones from "./pages/Estaciones";
import Landing from "./pages/Landing";
import Footer from "./components/Footer/Footer";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
  <BrowserRouter>
    <AuthProvider>
      <Menu />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/reserva" element={<Inicio />} />
        <Route path="/estaciones" element={<Estaciones />} />
        <Route path="/administrador" element={<Administrador />} />
        <Route path="/logs" element={<Logs />} />
      </Routes>
      <Footer/>
    </AuthProvider>
  </BrowserRouter>
  </StrictMode>
);
