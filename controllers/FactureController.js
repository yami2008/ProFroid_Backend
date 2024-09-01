import Facture from "../models/Facture.js";

const index = async (req, res) => {
    const factures = await Facture.find();
    return res.status(200).json({
        data : factures ,
    });
}

const store = async (req, res) => {
    // Récupère les détails de la facture et des produits à partir du corps de la requête
    const { numero, produits } = req.body;
    // Crée une nouvelle facture avec les détails fournis
    let prixTotal = 0 ;
    for (const produit of produits) {
        const produitDetails = await db.collection('produits').findOne({ _id: produit._id });
        if (produitDetails) {
            prixTotal += produitDetails.prix * produit.quantite;
        }
    }
    const facture = await Facture.create({
        numero, 
        prixTotal,
        produits
    });
    return res.status(200).json({
        data : facture,
        message : "Facture ajoutée avec succes" ,
    });
}

const show = async (req, res) => {
    const facture = await Facture.findById(req.params.id).populate('products');
    if (!facture){
        return res.status(404).json({
            message : "facture Not Found" ,
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
    facture.prix = req.body.prix ;
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

export {index, store, show, update, destroy}