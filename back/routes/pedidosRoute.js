import express from "express";
import { Pedido } from "../models/pedidoModel.js";

const router = express.Router();

// Ruta para guardar un pedido
router.post('/', async (request,response)=>{
    try {
        
        if(
            !request.body.cliente ||
            !request.body.descripcion ||
            !request.body.direccion ||
            !request.body.edificio ||
            !request.body.sala
        ){
            return response.status(400).send({
                message: 'Envia todo los datos: cliente, descripcion, direccion, edificio, sala',
            });
        }

        const newPedido = {
            cliente: request.body.cliente,
            descripcion: request.body.descripcion,
            direccion: request.body.direccion,
            edificio: request.body.edificio,
            sala: request.body.sala,
            entregado: false,
        };

        const pedido = await Pedido.create(newPedido);

        return response.status(201).send(pedido);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

// Obten los pedidos
router.get('/', async (request, response)=>{
    try {
        
        const pedidos = await Pedido.find({});
        
        return response.status(200).json({
            count: pedidos.length,
            data: pedidos
        });
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Obten los pedidos no entregados
router.get('/no-entregado', async (request, response)=>{
    try {
        
        const pedidos = await Pedido.find({entregado:false});
        
        return response.status(200).json({
            count: pedidos.length,
            data: pedidos
        });
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Obten los pedidos entregados
router.get('/entregado', async (request, response)=>{
    try {
        
        const pedidos = await Pedido.find({entregado:true});
        
        return response.status(200).json({
            count: pedidos.length,
            data: pedidos
        });
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Ruta para un pedido por ID
router.get('/:id', async (request, response)=>{
    try {
        
        const { id } = request.params;
        
        const pedido = await Pedido.findById(id);

        if(!pedido){
            return response.status(404).json({message: 'Pedido no encontrado'});
        }
        
        return response.status(200).json(pedido);
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Actualizar un pedido
router.put('/:id', async (request, response)=>{
    try {
        
        if(
            !request.body.cliente ||
            !request.body.descripcion ||
            !request.body.direccion ||
            !request.body.edificio ||
            !request.body.sala 
        ){
            return response.status(400).send({
                message: 'Envia todo los datos: cliente, descripcion, direccion, edificio, sala',
            });
        }

        const { id } = request.params; 

        const result = await Pedido.findByIdAndUpdate(id, request.body);
        
        if(!result){
            return response.status(404).json({message: 'Pedido no encontrado'});
        }

        return response.status(200).send({message: 'Pedido actualizado'});

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message}); 
    }
})

// Eliminar un pedido
router.delete('/:id', async (request, response)=>{
    try {
        
        const {id} = request.params;

        const result = await Pedido.findByIdAndDelete(id);

        if(!result){
            return response.status(404).json({message: 'Pedido no encontrado'});
        }

        return response.status(200).send({message: 'Pedido eliminado'});

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})


export default router; 