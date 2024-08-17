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
        return res.status(422).json({
            errors : formattedErrors,
        });
    }
    else {
        next();
    }
}
export default validatorMiddleware ;