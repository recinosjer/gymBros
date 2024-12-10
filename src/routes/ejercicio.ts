import { Router, Request, Response} from "express";
import { deleteEjercicio, getEjercicio, getEjercicios, postEjercicio, updateEjercicio } from "../controllers/ejercicio.controllers";
import { checkJWT } from "../middleware/session";

const router = Router();

router.get("/", checkJWT, getEjercicios
);
router.get("/:id", checkJWT, getEjercicio);
router.post("/", checkJWT, postEjercicio);
router.put("/:id", checkJWT, updateEjercicio);
router.delete("/:id", checkJWT, deleteEjercicio);

export { router };