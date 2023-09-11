import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';

import { CrearPedido } from './pages/CrearPedido';
import { MostrarPedido } from './pages/MostrarPedido';
import { EditarPedido } from './pages/EditarPedido';
import { EliminarPedido } from './pages/EliminarPedido';
import { CambiarEstadoPedido } from './pages/CambiarEstadoPedido';


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />

      <Route path='/pedidos/crear' element={<CrearPedido />} />
      <Route path='/pedidos/detalles/:id' element={<MostrarPedido />} />
      <Route path='/pedidos/editar/:id' element={<EditarPedido />} />
      <Route path='/pedidos/eliminar/:id' element={<EliminarPedido />} />
      <Route path='/pedidos/cambiar-edo/:id' element={<CambiarEstadoPedido />} />
    </Routes>
  )
}

export default App;
