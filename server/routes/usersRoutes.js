const router = require('express').Router();

// Using userSignup function from utils
const { userSignup, userLogin, userAuth, serializeUser, checkRole } = require('../utils/Auth');


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

// Protected routes
// customer dashboard route
router.get('/customer-dashboard', userAuth , checkRole(['customer']) , async (req,res) => {
    // return res.json(serializeUser(req.user));
    return res.json('This is customer dashboard')
})

// Shop Owner dashboard route
router.get('/shop_owner-dashboard', userAuth , checkRole(['shop_owner']) , async (req,res) => {
    // return res.json("shop dashboard");
    return res.json('This is owner dashboard')

})

module.exports = router;
