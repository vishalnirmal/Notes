const jwt = require('jsonwebtoken');

function auth(req, res, next){
    const token = localStorage.getItem('token');
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
        props.history.push('/login');
    }
}

module.exports = auth;