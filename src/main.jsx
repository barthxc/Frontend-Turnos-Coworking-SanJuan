import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Inicio from './pages/Inicio';

import Menu from './components/Menu/Menu';
import Administrador from './pages/Administrador';
import Logs from './pages/Logs';
import Estaciones from './pages/Estaciones';

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <Menu/>
      <Routes>
        <Route path='/' element={<Inicio/>} />
        <Route path='/estaciones' element={<Estaciones/>} />
        <Route path='/administrador' element={<Administrador/>} />
        <Route path='/logs' element={<Logs/>} />
      </Routes>

    </BrowserRouter>

)
