import {Router} from "express";
import {login} from "../controllers/AuthController.js";

const router = Router();

router.post('/login', login);

export { router as authRouter }