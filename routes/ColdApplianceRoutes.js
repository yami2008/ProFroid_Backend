import {Router} from "express";
import errorHandler from "../middlewares/vendor/ErrorHandler.js";
import objectIdMiddleware from "../middlewares/vendor/ObjectIdMiddleware.js";
import validatorMiddleware from "../middlewares/vendor/ValidatorMiddleware.js";

import coldApplianceSchema from "../validations/ColdApplianceValidation.js";
import * as Controller from "../controllers/ColdApplianceController.js"
import multer from "multer"

const router = Router();
const upload = multer({
    dest : './public/cold_appliances' ,
});
const cpUpload = upload.array("images", 99);

router.get('/cold-appliances', errorHandler(Controller.index));
router.post('/cold-appliances', cpUpload, validatorMiddleware(coldApplianceSchema), errorHandler(Controller.store));
router.get('/cold-appliances/:id', objectIdMiddleware, errorHandler(Controller.show));
router.put('/cold-appliances/:id', objectIdMiddleware, cpUpload, validatorMiddleware(coldApplianceSchema), errorHandler(Controller.update));
router.delete('/cold-appliances/:id', objectIdMiddleware, errorHandler(Controller.destroy));


router.post('/cold-appliances/:id/addImage', objectIdMiddleware, cpUpload, errorHandler(Controller.addImage));
router.post('/cold-appliances/:id/removeImage', objectIdMiddleware, errorHandler(Controller.removeImage));

export { router as coldApplianceRoutes }