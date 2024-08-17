const errorHandler = (handler) => (req, res, next) => {
    handler(req, res).catch(err => next(err));
}
export default errorHandler;