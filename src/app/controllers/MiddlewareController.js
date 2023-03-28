const jwt = require('jsonwebtoken');


const middlewareController = {

    verfyToken: (req, res, next) => {
        //const token=req.headers.token;
        const token = req.cookies.acessToken;
        if (!token) {
            res.status(401).json("You are not authenticated!");
        }

        jwt.verify(token, "secret", (err, user) => {
            if (err) res.status(403).json("Token is not valid!");
            req.user = user;
            next()
        })
    },

    verfyTokenandAdminAuth: (req, res, next) => {
        middlewareController.verfyToken(req, res, () => {
            if (req.user.admin) {
                next();
            }
            else {
                res.status(403).json("You are not auth");
            }
        });
    },

}
module.exports = middlewareController;