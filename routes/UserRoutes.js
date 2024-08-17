import {Router} from "express";

import validatorMiddleware from "../middlewares/vendor/ValidatorMiddleware.js";
import objectIdMiddleware from "../middlewares/vendor/ObjectIdMiddleware.js";
import errorHandler from "../middlewares/vendor/ErrorHandler.js";


import {destroy, index, show, store, update} from "../controllers/UserController.js";
import {storeUserValidation} from "../validations/UserValidation.js";

const router = Router();

router.get('/users', errorHandler(index));
router.post('/users', validatorMiddleware(storeUserValidation), errorHandler(store));
router.get('/users/:id', objectIdMiddleware, errorHandler(show));
router.put('/users/:id', objectIdMiddleware, validatorMiddleware(storeUserValidation), errorHandler(update));
router.delete('/users/:id', objectIdMiddleware, errorHandler(destroy));

export { router as userRoutes } ;