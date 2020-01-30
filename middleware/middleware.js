const jwt = require('jsonwebtoken');

function auth(req, res, next){
    const token = req.header('x-auth-token');
    if (!token){
        res.status(400);
    }
    else{
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
}

module.exports = auth;