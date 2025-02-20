const UserModel = require('../model/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const signup = async (req, res)=>{
    try{
        const {name, email, password} = req.body;
        const user = await UserModel.findOne({email});
        if(user){
            return res.status(400).json({
                message: "User already exists"
            })
        }

        const userModel = new UserModel({name, email, password});
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();

        res.status(200).json({
            message: "User created successfully",
            success: true
        })
    }catch(err){
        res.status(500).json({
            message: "Internal server error",
            success: false,
            err
        })
    }
}


const login = async (req, res)=>{
    try{
        const {email, password} = req.body;
        console.log(email, password);
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(400).json({
                message: "User not found"
            })
        }

        //validation
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            res.status(400).json({
                message: "Invalid Password"
            })
        }

        const jwtToken = await jwt.sign(
            {email:user.email, _id: user._id},
            process.env.JWT_SECRET_KEY,
            {expiresIn: "24h"}
        )

        return res.status(200).json({
            message: "Login successful",
            success: true,
            jwtToken,
            email,
            name: user.name
        })

    }catch(err){
        res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

module.exports = {signup, login};