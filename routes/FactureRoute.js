import {Router} from "express";

import objectIdMiddleware from "../middlewares/vendor/ObjectIdMiddleware.js";
import errorHandler from "../middlewares/vendor/ErrorHandler.js";
import {index, store, show, update, destroy, ajouterProduit, removeProduit} from "../controllers/FactureController.js";

const router = Router();

router.get('/factures', errorHandler(index));
router.post('/factures', errorHandler(store));
router.get('/factures/:id', objectIdMiddleware, errorHandler(show));
router.put('/factures/:id', objectIdMiddleware, errorHandler(update));
router.delete('/factures/:id', objectIdMiddleware, errorHandler(destroy));

router.post('/factures/:id/produits', errorHandler(ajouterProduit));
router.delete('/factures/:factureId/produits/:produitId', removeProduit);

export { router as factureRouter } ;