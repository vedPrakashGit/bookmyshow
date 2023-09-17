const jwt = require('jsonwebtoken');

module.exports = function (req, res, next){
    try{
        let token = req.headers.authorization.split(' ')[1];
        // console.log(token);
        let decoded = jwt.verify(token, process.env.secret_key_jwt);
        // console.log(decoded);
        req.body.userId = decoded.userId;
        next();
    }catch(err){
        res.send({
            success: false,
            message: "Invalid token!"
        })
    }

}