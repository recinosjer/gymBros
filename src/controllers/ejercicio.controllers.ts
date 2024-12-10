import { Response, Request } from "express"
import { handleHttp } from "../utils/error.handler"
import { insertEjercicio, obtenerEjercicio, obtenerEjercicios, actualizarEjercicio, eliminarEjercicio} from "../service/ejercicio.service"

const getEjercicio = async ({ params }: Request, res: Response) => {
    try{
        const { id } = params
        const response = await obtenerEjercicio(id);
        res.send(response);
    }catch(e){
        handleHttp(res, 'Error para obtener la informacion')
    }
}

const getEjercicios = async (req: Request, res: Response) => {
    try{
        const response = await obtenerEjercicios();
        res.send(response);
    }catch(e){
        handleHttp(res, 'Error para obtener la informacion')
    }
}

const postEjercicio = async ({ body }: Request, res: Response) => {
    try{
        const responseEjercicio = await insertEjercicio(body);
        res.send(responseEjercicio);
    }catch(e){
        handleHttp(res, 'Error para guardar Ejercicio')
    }
}

const updateEjercicio = async ({ params, body }: Request, res: Response) =>{
    try{
        const { id } = params;
        const response = await actualizarEjercicio(id, body);
        res.send(response);
    }catch(e){
        handleHttp(res, 'Error para actualizar Ejercicio')
    }
}

const deleteEjercicio = async ({ params }: Request, res: Response) => {
    try{
        const { id } = params;
        const response = await eliminarEjercicio(id);
        res.send(response);
    }catch(e){
        handleHttp(res, 'Error para eliminar Ejercicio')
    }
}

export { getEjercicio, getEjercicios, postEjercicio, updateEjercicio, deleteEjercicio }