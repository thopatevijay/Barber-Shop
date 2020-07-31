const bcrypt =  require('bcryptjs');
const User = require('../models/usersModel');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { SECRET } = require('../config');

// singup fucntion

const userSignup = async (userDetails, role, res) => {
    try {
    // validate the username
    let usernameExist = await validateUsername(userDetails.username);
    if(!usernameExist){
        return res.status(400).json({
            message: `Username is already taken.`,
            success: false
        });
    }

    // validate the email
    let emailExist = await validateEmail(userDetails.email);
    if(!emailExist){
        return res.status(400).json({
            message: `Email is already taken.`,
            success: false
        });
    }

    // Get the hashed password
    const password = await bcrypt.hash(userDetails.password,12);
    // create a new user
    const newUser = new User({
        ...userDetails, // spread operator
        password,
        role
    });
    await newUser.save();
    return res.status(201).json({
        message: "registered successfully",
        success: true
    });  
        
    } catch (err) {
        console.log(err)
     return res.status(500).json({
         message: 'Unable to Sign Up',
         success: true
     });
    }  
};


// Login function
const userLogin = async ( userCredentials, role, res) =>{
    try {

    let { username, password } = userCredentials;

    // Checking whether the username exists
    const user = await User.findOne( { username });
    if(!user){
        return res.status(404).json({
            message: "Username is not found.",
            success: false
        });
    }
    // Checking the role
    if(user.role !== role){
        return res.status(404).json({
            message: "make sure you are logging from the right portal.",
            success: false
        });
    }

    // checking the password
    let isMatch = await bcrypt.compare(password, user.password);
    if(isMatch){
        // Sign in the token and issue it to the user
        let token = jwt.sign({
            user_id: user._id,
            role: user.role,
            username: user.username,
            email: user.email
        },
        SECRET,
        { expiresIn: "7 days"}
        );

        let result = {
            username: user.username,
            role: user.role,
            email: user.email,
            token: `Bearer ${token}` ,
            expiresIn: 168
        };

        return res.status(200).json({
            ...result,
            message: "You are logged In",
            success: true
        });

        // if(user.role == 'customer'){
        //     return res.status(200).json({
        //             ...result,
        //             message: "You are logged In as customer",
        //             success: true
        //         });
        // }else{
        //     return res.status(200).json({
        //         ...result,
        //         message: "You are logged In as Shop Owner",
        //         success: true
        //     });
        // }
    } else {
        return res.status(403).json({
            message: "Incorrect Password", 
            success: false
        });
    }
    } catch (err) {
        console.log(err)
     return res.status(500).json({
         message: 'Unable to Log In',
         success: true
     });
    }  
}; 

const validateUsername = async username => {
    let user = await User.findOne({ username });
    if(user){
        return false;
    }else {
        return true;
    }
}  

const validateEmail = async email => {
    let user = await User.findOne({ email });
    if(user){
        return false;
    }else {
        return true;
    }
}

// Passport middleqware
const userAuth = passport.authenticate("jwt", { session: false});

// Cheking role for the router authentication
const checkRole = roles => (req,res,next) => {
    if(roles.includes(req.user.role)){
        return next();
    }
    return res.status(401).json({
        message: "Unauthorized",
        success: false
    });
};

const serializeUser = user => {
    return {
        username: user.username,
        email: user.email,
        name: user.name
    }
}

module.exports = { userSignup, userLogin, userAuth, serializeUser, checkRole};

