import { validationResult } from "express-validator";
import userModel from '../model/user.model.js';
import jwt from "jsonwebtoken";

import bcrypt from "bcryptjs";

export const  createUser = async(req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array().msg });
    }

    const { username, email, password, location } = req.body;
    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(password,salt);
    try {
        userModel.create({
            email: email,
            password: secPassword,
            username: username,
            location: location
        }).then(() => {
            res.json({ success: true });
        }).catch(err => {
            console.log(err);
            res.status(500).json({ success: false, message: "Database error" });
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const loginUser = async (req, res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try{

     const user = await userModel.findOne({email})
     if(user){
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }

        const data = {
            user : user.id
        }

        const authToken = jwt.sign(data,"Here should be any secret key");
         
        return res.json({success : true, authToken});
     }
      
     return res.json({success : false, message : "Credentials not matching"}).status(400)
    }

    catch(err){
        res.json({success: false});
    }
    
}

