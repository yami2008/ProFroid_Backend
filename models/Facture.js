import mongoose from "mongoose";

const produitSchema = new mongoose.Schema({
    nom: String,
    prix: Number,
    quantite: Number
});

const FactureSchema = new mongoose.Schema({
    numero : String ,
    prix : Number ,
    produits : [produitSchema],
},{
    collection : 'factures',
    timestamps : true ,
});

const Facture = mongoose.model('Facture', FactureSchema);
export default Facture ;