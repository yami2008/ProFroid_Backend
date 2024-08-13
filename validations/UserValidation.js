import joi from "joi";

const messages = {
    'string.base' : 'Ce champ doit être une chaîne de caractères.',
    'string.min' : 'Ce champs doit contenir au moins 3 caractères.',
    'any.required': 'Ce champ est obligatoire.'
}

export const storeUserValidation = joi.object({
    username : joi.string().trim().min(5).max(50).required().messages(messages),
    password : joi.string().trim().min(5).max(50).required().messages(messages),
    first_name : joi.string().trim().min(1).max(50).messages(messages),
    last_name : joi.string().trim().min(1).max(50).messages(messages),
    phone_number : joi.string().trim().min(1).max(50).messages(messages),
    address : joi.string().trim().min(1).max(50).messages(messages),
});