const validatorMiddleware = (schema) => (req, res, next) => {

    const { error } = schema.validate(req.body, { abortEarly: false });

    let formattedErrors = {};

    if (error) {
        formattedErrors = error.details.reduce((acc, detail) => {
            const field = detail.path.join('.');
            if (!acc[field]) {
                acc[field] = [];
            }
            acc[field].push(detail.message);
            return acc;
        }, {});
    }

    let customErrors = {};
    // if (true || false) {
    //     customErrors.username = 'Nom d\'utilisateur déjà utilisé.';
    // }

    // Ajouter les erreurs personnalisées à l'objet d'erreurs formaté
    for (const [key, message] of Object.entries(customErrors)) {
        if (!formattedErrors[key]) {
            formattedErrors[key] = [];
        }
        formattedErrors[key].push(message);
    }

    if (Object.keys(formattedErrors).length > 0) {
        return res.status(422).json({
            errors: formattedErrors
        });
    }
    else {
        next();
    }
}
export default validatorMiddleware ;