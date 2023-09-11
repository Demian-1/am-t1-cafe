import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

export const CrearPedido = () => {
  const [cliente, setCliente] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [direccion, setDireccion] = useState('')
  const [edificio, setEdificio] = useState('')
  const [sala, setSala] = useState('')

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const handleGuardarPedido = ()=>{
    const data = { 
      cliente,
      descripcion,
      direccion,
      edificio,
      sala,
    };
    setLoading(true);
    axios
      .post('http://localhost:5555/pedidos', data)
      .then(()=>{
        setLoading(false);
        navigate('/');
      })
      .cath((error)=>{
        setLoading(false);
        alert('Ha ocurrido un error');
        console.log(error);
      });
  }
  
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className=''text-3x1 my-4>Crear pedido</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sy-400 rounded-x1 w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500' >Cliente</label>
          <input
            type='text'
            value={cliente}
            onChange={(e)=> setCliente(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500' >Descripcion del pedido</label>
          <input
            type='text'
            value={descripcion}
            onChange={(e)=> setDescripcion(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500' >Direccion</label>
          <input
            type='text'
            value={direccion}
            onChange={(e)=> setDireccion(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500' >Edificio</label>
          <input
            type='text'
            value={edificio}
            onChange={(e)=> setEdificio(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500' >Sala o salon</label>
          <input
            type='text'
            value={sala}
            onChange={(e)=> setSala(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleGuardarPedido}>Guardar</button>
      </div>
    </div>
  )
}
