import Facture from "../models/Facture.js";
import ColdAppliance from "../models/ColdAppliance.js";
import mongoose from "mongoose";


const index = async (req, res) => {
    const factures = await Facture.find();
    return res.status(200).json({
        data : factures ,
    });
}

const store = async (req, res) => {
    const { numero, produits } = req.body;
    let prixTotal = 0 ;
    for (const produit of produits) {
        const produitDetails = await ColdAppliance.findById(produit.id);
        if (produitDetails) {
            prixTotal = prixTotal + produitDetails.price * produit.quantite;
        } else {
            return res.status(404).json({
                message: `Produit avec l'ID ${produit.id} non trouvé`,
            });
        }
    }
    const facture = await Facture.create({
        numero,
        prix: prixTotal,
        produits
    });
    
    return res.status(200).json({
        data : facture,
        message : "Facture ajoutée avec succes" ,
    });
}

const show = async (req, res) => {
    const facture = await Facture.findById(req.params.id).populate('produits.id');
    if (!facture){
        return res.status(404).json({
            message : "Facture Not Found" ,
        });
    }
    return res.status(200).json({
        data : facture,
    });
}

const update = async (req, res) => {
    const facture = await Facture.findById(req.params.id);
    if (!facture){
        return res.status(404).json({
            message : "Facture Not Found" ,
        });
    }
    facture.numero = req.body.numero ;
    facture.save();
    return res.status(200).json({
        data : facture ,
    });
}

const destroy = async (req, res) => {
    const facture = await Facture.findByIdAndDelete(req.params.id);
    if (!facture){
        return res.status(404).json({
            message : "Facture Not Found" ,
        });
    }
    return res.status(200).json({
        message: "Deleted successfully"
    });
};

const ajouterProduit = async (req, res) => {
    const factureId = req.params.id;
    const { produitId, quantite } = req.body;
    console.log(produitId);
    
    const facture = await Facture.findById(factureId);
    if (!facture) {
        return res.status(404).json({ 
            message: "Facture non trouvée"
        });
    }
    const produitDetails = await ColdAppliance.findOne({ 
        _id: produitId
    });
    if (!produitDetails) {
        return res.status(404).json({ 
            message: "Produit non trouvé"
        });
    }
    const nouveauProduit = {
        id: produitDetails._id,
        quantite
    };
    facture.produits.push(nouveauProduit);
    facture.prix += produitDetails.price * quantite;
    await facture.save();
    return res.status(200).json({
        data: facture,
        message: "Produit ajouté à la facture avec succès"
    });
};

const removeProduit = async (req, res) => {
    const { factureId, produitId } = req.params;
    const facture = await Facture.findById(factureId);
    if (!facture) {
        return res.status(404).json({
            message: "Facture non trouvée"
        });
    }
    const produitIndex = facture.produits.findIndex(produit => produit._id.toString() === produitId);

    if (produitIndex === -1) {
        return res.status(404).json({
            message: "Produit non trouvé dans la facture",
        });
    }
    facture.produits.splice(produitIndex, 1);

    let prixTotal = 0 ;
    for (const produit of facture.produits) {
        const produitDetails = await ColdAppliance.findById(produit.id);
        if (produitDetails) {
            prixTotal = prixTotal + produitDetails.price * produit.quantite;
        } else {
            return res.status(404).json({
                message: `Produit avec l'ID ${produit.id} non trouvé`,
            });
        }
    }
    facture.prix = prixTotal ;
    await facture.save();
    return res.status(200).json({
        data: facture,
        message: "Produit supprimé avec succès"
    });
};





export {index, store, show, update, destroy, ajouterProduit, removeProduit}