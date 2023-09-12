import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle, BsClipboardCheck, BsXCircle } from 'react-icons/bs'
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md'

export const Home = () => {
    const [pedidosEntregados, setPedidosEntregados] = useState([])
    const [pedidosNoEntregados, setPedidosNoEntregados] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5555/pedidos/entregado')
            .then((response) => {
                setPedidosEntregados(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
        axios
            .get('http://localhost:5555/pedidos/no-entregado')
            .then((response) => {
                setPedidosNoEntregados(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);


    return (
        <div className='p-4'>
            <div className='flex justify-between items-center m-8'>
                <h1 className='text-4xl my-8'>Lista de Pedidos</h1>
                <Link to='/pedidos/crear' className='flex flex-col items-center'>
                    <h3 className='text-2xl m-1'>Agregar pedido</h3>
                    <MdOutlineAddBox className='text-sky-800 text-4xl' />
                </Link>
            </div>
            <h2 className='text-3xl my-6'>Pedidos no entregados:</h2>
            {loading ? (
                <Spinner />
            ) : (
                <table className='w-full border-separate border-spacing-2'>
                    <thead>
                        <tr>
                            <th className='border border-slate-600 rounded-md'>No</th>
                            <th className='border border-slate-600 rounded-md'>Cliente</th>
                            <th className='border border-slate-600 rounded-md max-md:hidden'>Descripcion</th>
                            <th className='border border-slate-600 rounded-md max-md:hidden'>Direccion</th>
                            <th className='border border-slate-600 rounded-md'>Edificio</th>
                            <th className='border border-slate-600 rounded-md'>Sala / Salon</th>
                            <th className='border border-slate-600 rounded-md'>Estado</th>
                            <th className='border border-slate-600 rounded-md'>Operaciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidosNoEntregados.map((pedido, index) => (
                            <tr key={pedido._id} className='h-8'>
                                <td className='border border-slate-700 text-center'>
                                    {index + 1}
                                </td>
                                <td className='border border-slate-700 text-center'>
                                    {pedido.cliente}
                                </td>
                                <td className='border border-slate-700 text-center max-md:hidden'>
                                    {pedido.descripcion}
                                </td>
                                <td className='border border-slate-700 text-center max-md:hidden'>
                                    {pedido.direccion}
                                </td>
                                <td className='border border-slate-700 text-center max-md:hidden'>
                                    {pedido.edificio}
                                </td>
                                <td className='border border-slate-700 text-center max-md:hidden'>
                                    {pedido.sala}
                                </td>
                                <td className='border border-slate-700 text-center max-md:hidden'>
                                    {pedido.entregado?'Entregado':'No entregado'}
                                </td>
                                <td className='border border-slate-700 text-center'>
                                    <div className='flex justify-center gap-x-4'>
                                        <Link to={`/pedidos/cambiar-edo/${pedido._id}`}>
                                            <BsClipboardCheck className='text-8x1 text-green-800'></BsClipboardCheck>
                                        </Link>
                                        <Link to={`/pedidos/detalles/${pedido._id}`}>
                                            <BsInfoCircle className='text-8x1 text-grey-800'></BsInfoCircle>
                                        </Link>
                                        <Link to={`/pedidos/editar/${pedido._id}`}>
                                            <AiOutlineEdit className='text-8x1 text-yellow-600'></AiOutlineEdit>
                                        </Link>
                                        <Link to={`/pedidos/eliminar/${pedido._id}`}>
                                            <MdOutlineDelete className='text-8x1 text-red-600'></MdOutlineDelete>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
            }
            <h2 className='text-3xl my-6'>Pedidos entregados:</h2>
            {loading ? (
                <Spinner />
            ) : (
                <table className='w-full border-separate border-spacing-2'>
                    <thead>
                        <tr>
                            <th className='border border-slate-600 rounded-md'>No</th>
                            <th className='border border-slate-600 rounded-md'>Cliente</th>
                            <th className='border border-slate-600 rounded-md max-md:hidden'>Descripcion</th>
                            <th className='border border-slate-600 rounded-md max-md:hidden'>Direccion</th>
                            <th className='border border-slate-600 rounded-md'>Edificio</th>
                            <th className='border border-slate-600 rounded-md'>Sala / Salon</th>
                            <th className='border border-slate-600 rounded-md'>Estado</th>
                            <th className='border border-slate-600 rounded-md'>Operaciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidosEntregados.map((pedido, index) => (
                            <tr key={pedido._id} className='h-8'>
                                <td className='border border-slate-700 text-center'>
                                    {index + 1}
                                </td>
                                <td className='border border-slate-700 text-center'>
                                    {pedido.cliente}
                                </td>
                                <td className='border border-slate-700 text-center max-md:hidden'>
                                    {pedido.descripcion}
                                </td>
                                <td className='border border-slate-700 text-center max-md:hidden'>
                                    {pedido.direccion}
                                </td>
                                <td className='border border-slate-700 text-center max-md:hidden'>
                                    {pedido.edificio}
                                </td>
                                <td className='border border-slate-700 text-center max-md:hidden'>
                                    {pedido.sala}
                                </td>
                                <td className='border border-slate-700 text-center max-md:hidden'>
                                    {pedido.entregado?'Entregado':'No entregado'}
                                </td>
                                <td className='border border-slate-700 text-center'>
                                    <div className='flex justify-center gap-x-4'>
                                        <Link to={`/pedidos/cambiar-edo/${pedido._id}`}>
                                            <BsXCircle className='text-4x1 text-red-800'></BsXCircle>
                                        </Link>
                                        <Link to={`/pedidos/detalles/${pedido._id}`}>
                                            <BsInfoCircle className='text-4x1 text-grey-800'></BsInfoCircle>
                                        </Link>
                                        <Link to={`/pedidos/editar/${pedido._id}`}>
                                            <AiOutlineEdit className='text-4x1 text-yellow-600'></AiOutlineEdit>
                                        </Link>
                                        <Link to={`/pedidos/eliminar/${pedido._id}`}>
                                            <MdOutlineDelete className='text-4x1 text-red-600'></MdOutlineDelete>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
            }
        </div>
    )
}
