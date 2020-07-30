const bcrypt =  require('bcryptjs');
const User = require('../models/usersModel');

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

module.exports = { userSignup };

