const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userDetails = require('../models/userModel')

const JWT_SECRET = "blog@data"

exports.signupUser = async ( req , res ) =>{
    try{
        const { name , email , password } = req.body;
        console.log(req.body)

        if( !name || !email || !password ){
            console.log("All Fields Required")
            res.status(400).json({error : "All Fields Required"})
        }
        const user = await userDetails.findOne({ email })
        if(user){
            console.log("Email Already Exists")
            res.status(409).json({ error : "Email already Exists"})
        }
        const encryptPass = await bcrypt.hash(password, 10)
        const newUser = new userDetails({
            name,
            email,
            password : encryptPass
        })
        await newUser.save();
        console.log("User Created successfully")
        res.status(201).json({success:true , message:"User Created Successfully"})
    }
    catch(error){
        console.log("Error while signing Up :-", error)
        res.status(500).json({ error :"Internal Server Error"})

    }

    
}

exports.loginUser = async ( req , res ) =>{
    try{
        const { email , password } = req.body;

        if( !email || !password ){
            res.status(400).json({error : "All Fields Required"})
        }
        const alreadyUser = await userDetails.findOne({ email })
        if(!alreadyUser){
            res.status(404).json({error : "User Not Found"})
        }
        const passMatch = await bcrypt.compare(password, alreadyUser.password)
            if(!passMatch){
                res.status(403).json({error : "Password does not Match"})
            }
            const token = jwt.sign(
               {userId : alreadyUser._id , email : alreadyUser.email},
               JWT_SECRET,
               {expiresIn : "23h"}
        );
        res.status(200).json({success : true, message : "Login Successfully", userMail:alreadyUser.email,token, userName:alreadyUser.name})
        
    }
    catch(error){
        console.log("Error while Logging In", error)
        res.status(500).json( {error : "Login Failed"})
    }
}

exports.deleteUser = async ( req, res ) =>{
    try{

    }
    catch(error){

    }
}