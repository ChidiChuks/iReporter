const middleware = (error, req, res, next) => {
    if (error) {
        res.json({
            status: 404,
            message: error.message
        });
    };
    next();
};
module.exports = middleware;