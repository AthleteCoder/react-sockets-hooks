const jwt = require("jsonwebtoken");

exports.createToken = (objectToken) => {
    const token = jwt.sign(objectToken, process.env.MY_SECRET, {
        expiresIn: "30m"
    });
    return token;
}

exports.tokenMiddleware = (req, res, next) => {
    const token = req.cookies['X-CSRFToken'] || req.cookies['csrftoken'];
    if (token) {
        jwt.verify(token, process.env.MY_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).json({
                    message: "Access denied!"
                });
                return;
            }
            req.user = decoded;
            next();
        });
    } else {
        res.status(401).json({
            message: "Access denied!"
        });
        return;
    }
}