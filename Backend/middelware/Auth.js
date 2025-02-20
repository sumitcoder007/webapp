const jwt = require('jsonwebtoken');

const ensureAuthentication = (req, res, next) =>{
    console.log('Welcome To Authorized Routes')
    const auth = req.headers['authorization'];
    if(!auth){
        return res.status(401).json({
            message: 'Unauthorized, JWT token is require'
        })
    }

    try{
        const decoded = jwt.verify(auth, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch(err) {
        return res.status(401).json({
            message: 'Unauthorized, JWT token is invalid or expire'
        })
    }
}

module.exports = ensureAuthentication;