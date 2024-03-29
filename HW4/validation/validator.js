function checkBody(schema) {
    return (req, res, next) => {
        const validationResult = schema.validate(req.body)
        if (validationResult.error) {
            return res.status(400).send({ error: validationResult.error.details })
        }
        next()
    }
}

module.exports = { checkBody }