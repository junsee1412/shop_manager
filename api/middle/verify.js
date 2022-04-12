const jwt = require("jsonwebtoken")

const verify = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (authHeader) {
        const token = authHeader
        jwt.verify(token, "Jun147Key", (err, user) => {
            if (err) {
                return res.status(403).json({"Message": "Token is not invalid!"})
            }
            req.user = user
            next()
        })
    } else {
        res.status(401).json({"Message": "You are not authenticated!"})
    }
}

module.exports = verify