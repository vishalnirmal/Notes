const jwt = require('jsonwebtoken');

function auth(req, res, next){
    const token = req.header('x-auth-token');
    if (token){
        jwt.verify(token, process.env.jwt_secret, (err, data)=>{
            if (err){
                res.json(err);
            }
            else{
                req.user = {
                    id: data.id
                }
                next();
            }
        });
    }
    else{
        res.sendStatus(401);
    }
}

module.exports = auth;