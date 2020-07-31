const router = require('express').Router();

// Using userSignup function from utils
const { userSignup, userLogin } = require('../utils/Auth');


// Customer SingUP route
router.post('/signUp-customer', async (req, res) => {
    await userSignup(req.body, "customer",res);
});

// Shop Owner SingUP route
router.post('/signUp-shop_owner', async (req, res) => {
    await userSignup(req.body, "shop_owner",res);
});

// customer login route
router.post('/login-customer', async (req, res) => {
    await userLogin(req.body, 'customer', res);
});

// Shop Owner login route
router.post('/login-shop_owner', async (req, res) => {
    await userLogin(req.body, 'shop_owner', res);
});


module.exports = router;
