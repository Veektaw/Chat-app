const errorHandler = (async (req, res, next) => {
    next(createError(404, 'This route does not exist'));
});

module.exports = errorHandler;