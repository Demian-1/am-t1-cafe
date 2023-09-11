import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

export const CambiarEstadoPedido = () => {
    const [cliente, setCliente] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [direccion, setDireccion] = useState('')
    const [edificio, setEdificio] = useState('')
    const [sala, setSala] = useState('')
    const [entregado, setEntregado] = useState(false)

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5555/pedidos/${id}`)
            .then((response) => {
                setCliente(response.data.cliente);
                setDescripcion(response.data.descripcion);
                setDireccion(response.data.direccion);
                setEdificio(response.data.edificio);
                setSala(response.data.sala);
                setEntregado(!response.data.entregado);

                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                alert('Ha ocurrido un error');
                console.log(error)
            })
    }, [])

    const handleCambiarEdoPedido = () => {
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
            .then(() => {
                setLoading(false);
                navigate('/');
            })
            .catch((error) => {
                setLoading(false);
                alert('Ha ocurrido un error en el catch');
                console.log(error);
            });
    }

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3x1 my-4'>Cambiar Estado del Pedido</h1>
            {loading ? <Spinner /> : ''}
            <div className='flex flex-col items-center border-2 border-sky-400 rounded-x1 w-[600px] p-8 mx-auto'>
                <h3 className='text-2x1'>Estas Seguro de que deseas cambiar el estado del pedido?</h3>
                <button className='p-4 bg-red-600 text-white m-8 w-full' onClick={handleCambiarEdoPedido}>
                    SI
                </button>
            </div>
        </div>
    )
}
