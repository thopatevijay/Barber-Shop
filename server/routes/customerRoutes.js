const router = require('express').Router();

const { bookingTime, searchShop, previousBookings } = require('../controllers/customerControllers');
const { json } = require('body-parser')

// Search shops
router.get('/customer-dashboard/searchShop', async (req,res) => {
    await searchShop(req.query,res);
});

// Book new SLot
router.post('/customer-dashboard/booktime/customer-/:custId/shop-/:shopId', async (req,res) => {
    await bookingTime(req.body,req.params,res);
});

// Customers can check their previous bookings.
router.get('/customer-dashboard/previous_bookings/:custId', async (req,res) => {
    await previousBookings(req.params,res);
})

module.exports = router;