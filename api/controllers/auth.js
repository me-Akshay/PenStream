
import {db} from "../db.js"
import bcrypt from "bcryptjs"
// import {React,useState} from "react"    
import jwt from "jsonwebtoken"


//function to register new user
export const register = (req, res) => {
    
    
    //check existing user
    const q="SELECT * FROM users WHERE email = ? OR username = ?"
    db.query(q,[req.body.email,req.body.username],(err,data)=>{
        if(err) return res.json(err)
        if(data.length) return res.status(409).json("user already exist");

        //hashing the password and create a user
   //hashing the password

        const salt = bcrypt.genSaltSync(10);
   const hash = bcrypt.hashSync(req.body.password, salt);
        //inserting the user in the db
        const q="INSERT INTO users (`username`,`email`,`password`) VALUES (?)"
        const values=[req.body.username,req.body.email,hash]

        db.query(q,[values],(err,data)=>{
            if(err) return res.json(err)
            return res.status(200).json("user created")
        })
    })
}


//function for login of user
export const login = (req, res) => {
    const q="SELECT * FROM users WHERE username = ?"
    db.query(q,[req.body.username],(err,data)=>{
        if(err) return res.json(err);

        console.log(data[0]);
        
        if(data.length==0)return res.status(404).json("user not found");
        //checking password
        //data will be the rows matching in the database
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);

        if(!isPasswordCorrect) return res.status(400).json("wrong username or  password");

        const token=jwt.sign({id:data[0].id},"jwtkey");
        //we will send only user info not its pass in cookie

        const {password,...other}=data[0];

        res.cookie("access_token",token,{
            httpOnly:true 
        }).status(200).json(other)


    });
}



//function for logout of user
export const logout = (req, res) => {
    res.clearCookie("access_token",{
        sameSite:"none",
        secure:true 
    }).status(200).json("user has been logged out")
}