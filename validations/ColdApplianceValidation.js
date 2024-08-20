import Joi from 'joi';

const errorMessages = {
    'string.base': `"{{#label}}" doit être une chaîne de caractères`,
    'string.empty': `"{{#label}}" ne peut pas être vide`,
    'string.min': `"{{#label}}" doit contenir au moins {#limit} caractères`,
    'string.max': `"{{#label}}" ne peut pas dépasser {#limit} caractères`,
    'string.alphanum': `"{{#label}}" doit contenir uniquement des caractères alphanumériques`,
    'any.required': `"{{#label}}" est un champ obligatoire`,
    'number.base': `"{{#label}}" doit être un nombre`,
    'number.integer': `"{{#label}}" doit être un nombre entier`,
    'number.positive': `"{{#label}}" doit être un nombre positif`,
    'number.precision': `"{{#label}}" doit avoir au maximum {#limit} chiffres après la virgule`,
    'any.only': `"{{#label}}" doit être l'une des valeurs suivantes : {#valids}`,
};

const coldApplianceSchema = Joi.object({
    name: Joi.string().min(3).max(50).trim().required().label("Nom"),
    brand: Joi.string().min(2).max(30).trim().required().label("Brand"),
    // model: Joi.string().min(2).max(30).trim().required().label("Model"),
    serial_number: Joi.string().min(5).max(20).trim().required().label("Numéro de série"),
    type: Joi.string().required().label("Type"),
    // capacity : Joi.number().min(0).max(10000).optional().label("Capacity"),
    // power : Joi.number().min(0).max(10000).optional().label("Power"),
    // height : Joi.number().min(0).max(10000).optional().label("Hauteur"),
    // width : Joi.number().min(0).max(10000).optional().label("Largeur"),
    // depth : Joi.number().min(0).max(10000).optional().label("Profondeur"),
    price: Joi.number().positive().required().label("Prix"),
    // stock_quantity: Joi.number().integer().positive().required().label("Qauntity"),
    // features : Joi.array().items(Joi.string().min(2).max(100).trim())
}).messages(errorMessages);

export default coldApplianceSchema;