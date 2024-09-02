import mongoose from "mongoose";

const produitSchema = new mongoose.Schema({
    id: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ColdAppliance'
    },
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