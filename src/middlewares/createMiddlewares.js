export const validateBody = (schema) => (req, res, next) => {
    let parsedBody;
    try {
        parsedBody = schema.parse(req.body);
    } catch (error) {
        return next(error);
    }
    req.body = parsedBody;
    next();
};