import mongoose from "mongoose";

const pedidoSchema = mongoose.Schema(
    {
        cliente:{
            type: String,
            required: true,
        },
        descripcion: {
            type: String,
            required: true,
        },
        direccion:{
            type: String,
            required: true,
        },
        edificio:{
            type: String,
            required: true,
        },
        sala:{
            type: String,
            required: true,
        },
        entregado:{
            type: Boolean,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

export const Pedido = mongoose.model('Pedidos', pedidoSchema);