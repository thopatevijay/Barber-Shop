const router = require('express').Router();

const { todaysBookings, advancedBooking, assignCustomer, activeCustomers, releaseCustomer } = require('../controllers/shop_ownerControllers');

// Shop owners can check today's bookings
router.get('/shop_owner-dashboard/todaysbookings/:shopId', async (req,res) => {
    await todaysBookings(req.params,res);
});

// Shop owners can check advanced bookings
router.get('/shop_owner-dashboard/advancedbookings/:shopId', async (req,res) => {
    await advancedBooking(req.params,res);
});

// Assigning a customer waiting in queue.
router.put('/assign_customer/:bookingId', async (req,res) => {
    await assignCustomer(req.params,res);
});

// Shop owner can check active customer.
router.get('/active_customers/:shopId', async (req,res) => {
    await activeCustomers(req.params,res);
});

// Release a customer.
router.put('/release_customer/:bookingId', async (req,res) => {
    await releaseCustomer(req.params,res);
});
module.exports = router;
