import { Ejercicio } from "../interfaces/ejercicio.interface";
import EjercicioModel from "../models/ejercicio.model";

const insertEjercicio = async (Ejercicio: Ejercicio) => {
    const resposeInsert = await EjercicioModel.create(Ejercicio);
    return resposeInsert;
};

const actualizarEjercicio = async (id: string, data: Ejercicio) => {
    const responseEjercicio =  await EjercicioModel.findOneAndUpdate({ _id:id }, data, { new: true });
    return responseEjercicio;
};

const eliminarEjercicio = async (id: string) => {
    const responseEjercicio = await EjercicioModel.deleteOne({_id:id});
    return responseEjercicio;
};

const obtenerEjercicios = async () => {
    const responseEjercicio = await EjercicioModel.find({});
    console.log(responseEjercicio);
    return responseEjercicio;
};

const obtenerEjercicio = async (id: string) => {
    const responseEjercicio = await EjercicioModel.findOne({_id:id});
    return responseEjercicio;
};

export { insertEjercicio, actualizarEjercicio, eliminarEjercicio, obtenerEjercicio, obtenerEjercicios  };