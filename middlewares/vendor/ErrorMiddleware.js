const errorMiddleware = (err, req, res, next) => {
    res.status(500).json({
        message: "Server error"
    });
    // D'autre actions telles que Send Mail etc...
    console.log(err);
};

export {errorMiddleware};