import { Schema, model } from "mongoose";

const IntemSchema = new Schema(
    {
        Nombre: {
            type: String,
            required: true,
        },
        Peso: {
            type: Number,
            required: true,
        },
        ZonaMuscular: {
            type: String,
            required: true,
        },
        Repeticiones: {
            type: Number,
            required: true,
        },
        Fecha: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const EjercicioModel = model('ejercicios', IntemSchema);

export default EjercicioModel;
