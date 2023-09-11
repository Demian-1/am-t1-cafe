import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

export const MostrarPedido = () => {
    const [pedido, setPedido] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(()=>{
        setLoading(true);
        axios
            .get(`http://localhost:5555/pedidos/${id}`)
            .then((response)=>{
                setPedido(response.data);
                setLoading(false);
            })
            .catch((error)=>{
                console.log(error);
                setLoading(false);
            })
    },[]);

  return (
    <div className='p-4'>
        <BackButton />
        <h1 className='text-3x1 my-4'>Detalles del pedido</h1>
        {loading ? (
            <Spinner />
        ) : (
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
                <div className='my-4'>
                    <span className='text-x1 mr-4 text-gray-500'>Id:</span>
                    <span>{pedido._id}</span>
                </div>
                <div className='my-4'>
                    <span className='text-x1 mr-4 text-gray-500'>Cliente:</span>
                    <span>{pedido.cliente}</span>
                </div>
                <div className='my-4'>
                    <span className='text-x1 mr-4 text-gray-500'>Descripcion:</span>
                    <span>{pedido.descripcion}</span>
                </div>
                <div className='my-4'>
                    <span className='text-x1 mr-4 text-gray-500'>Direccion:</span>
                    <span>{pedido.direccion}</span>
                </div>
                <div className='my-4'>
                    <span className='text-x1 mr-4 text-gray-500'>Edificio:</span>
                    <span>{pedido.edificio}</span>
                </div>
                <div className='my-4'>
                    <span className='text-x1 mr-4 text-gray-500'>Sala o salon:</span>
                    <span>{pedido.sala}</span>
                </div>
                <div className='my-4'>
                    <span className='text-x1 mr-4 text-gray-500'>Estado:</span>
                    <span>{pedido.entregado ? 'Entregado':'No entregado'}</span>
                </div>
                <div className='my-4'>
                    <span className='text-x1 mr-4 text-gray-500'>Hora de creacion:</span>
                    <span>{new Date(pedido.createdAt).toString()}</span>
                </div>
                <div className='my-4'>
                    <span className='text-x1 mr-4 text-gray-500'>Ultima actualizacion:</span>
                    <span>{new Date(pedido.updatedAt).toString()}</span>
                </div>
            </div>
        )}
    </div>
  )
}
