import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

export const EditarPedido = () => {
const [cliente, setCliente] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [direccion, setDireccion] = useState('')
  const [edificio, setEdificio] = useState('')
  const [sala, setSala] = useState('')
  const [entregado, setEntregado] = useState(false)

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(()=>{
    setLoading(true);
    axios.get(`http://localhost:5555/pedidos/${id}`)
    .then((response)=>{
      setCliente(response.data.cliente);
      setDescripcion(response.data.descripcion);
      setDireccion(response.data.direccion);
      setEdificio(response.data.edificio);
      setSala(response.data.sala);
      setEntregado(response.data.entregado);

      setLoading(false);
    })
    .catch((error)=>{
      setLoading(false);
      alert('Ha ocurrido un error');
      console.log(error)
    })
  }, [])

  const handleEditarPedido = ()=>{
    const data = { 
        cliente,
        descripcion,
        direccion,
        edificio,
        sala,
        entregado
    };
    console.log(data)
    setLoading(true);
    axios
      .put(`http://localhost:5555/pedidos/${id}`, data)
      .then(()=>{
        setLoading(false);
        navigate('/');
      })
      .catch((error)=>{
        setLoading(false);
        alert('Ha ocurrido un error en el catch');
        console.log(error);
      });
  }
  
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-8'>Editar pedido</h1>
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
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500' >Entregado:</label>
          <input
            type='checkbox'
            value='Entregado'
            checked={entregado}
            onChange={()=>{setEntregado(!entregado)}}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditarPedido}>Guardar</button>
      </div>
    </div>
  )
}
