import {Router} from "express";
import {login} from "../controllers/AuthController.js";
import errorHandler from "../middlewares/vendor/ErrorHandler.js";
import validatorMiddleware from "../middlewares/vendor/ValidatorMiddleware.js";
import authValidation from "../validations/AuthValidation.js";

const router = Router();



router.post('/login', validatorMiddleware(authValidation), errorHandler(login));

export { router as authRouter }