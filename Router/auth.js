const express = require('express');
const User = require('../model/userSchema');
const jwt = require('jsonwebtoken')
const Contact = require('../model/contactSchema');
const Router = express.Router();
require('../db/conn');

Router.get("/",(req,res)=>{
    res.send("Hello world")
})

Router.post("/register",(req,res)=>{

    const {name , email , number , password , cpassword} = req.body;

    if(!name || !email || !number || !password || !cpassword){
        return res.status(422).json({err:"plz fill all the fields given"})
    }

    User.findOne({ email: email})
        .then((userExist) => {
            if (userExist) {
                return res.status(420).json({err:"Email already exist"})
        }else if(password != cpassword){
            return res.status(421).json({err:"Password does not match"})
        }else{
            const user = new User({name , email , number , password , cpassword});
            user.save().then(() => {
                res.status(201).json({msg:"user registered successfully"});
            }).catch((err)=> res.status(422).json({error:"Failed to registered"}));
        }
        }).catch(err =>{console.log(err)})
})

Router.post("/login",async (req,res)=>{
    const {email, password} = req.body;
    let token;

    try{
        if(!email || !password){
            res.status(400).json({error:"Please fill all the data"})
        }

        const userSignin = await User.findOne({email:email});

        if (userSignin) {
            token = await userSignin.genrateToken();
            res.cookie("jsonWebToken",token,{
                maxAge:new Date(Date.now()+25892000000),
                httpOnly:true
            })
            
            if (userSignin.password === password) {
                res.status(200).json({message:"User signed in successfully"})
            }else{
                res.status(402).json({error:"Error occured wrong password"})
            }
        }else{
            res.status(401).json({error:"Error occured wrong email"})
        }
        
    }catch(err){
        console.log(err)
    }
})

Router.get("/logout",(req,res)=>{
    res.clearCookie('jsonWebToken',{path:'/',domain:'localhost'})
    res.status(200).send('User logged out')
})

Router.get("/contact",(req,res)=>{
    res.send("Welcome to the contact page")
})

Router.post("/contact",async (req,res)=>{
        const {name , email , message} = req.body;
    
        if(!name || !email || !message){
            return res.status(422).json({err:"plz fill all the fields given"})
        }

        const dataCotact = await User.findOne({email:email})
        
        console.log(dataCotact)

        if (dataCotact) {
            if (dataCotact.email == email) {
                const contact = new Contact({name , email , message});
                contact.save().then(() => {
                    res.status(200).json({msg:"saved successfully"});
                }).catch((err)=> res.status(400).json(err));
            }
        }else{
            return res.status(400).json({msg:"User does not exist"})
        }
        
})

Router.get("/cart",(req,res)=>{
    res.send("Welcome to the cart page")
})

Router.get("/explore",(req,res)=>{
    res.send("Welcome to the explore page")
})

module.exports = Router