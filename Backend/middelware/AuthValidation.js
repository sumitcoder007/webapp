
const joi = require('joi')

const signupValidation = (req, res, next)=>{
    const schema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().min(6).required()
    });

    const {error} = schema.validate(req.body);
    if(error){
        return res.status(400).json({
            message: "Bed request",
            error: error
        })
    }

    next();
}

const loginValidation = (req, res, next)=>{
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(6).required()
    });

    const {error} = schema.validate(req.body);
    if(error){
        return res.status(400).json({
            message: "Bed request",
            error: error
        })
    }
    next();
}

module.exports = {
    signupValidation,
    loginValidation
}