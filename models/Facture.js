import mongoose from "mongoose";

const FactureSchema = new mongoose.Schema({
    numero : String ,
    prix : Number ,
},{
    collection : 'factures',
    timestamps : true ,
});

const Facture = mongoose.model('Facture', FactureSchema);
export default Facture ;