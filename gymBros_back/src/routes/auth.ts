import { Router, Request, Response} from "express";
import { registerController, loginController } from "../controllers/auth.controllers";

const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);

export { router };