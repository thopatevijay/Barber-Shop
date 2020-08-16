const Booking = require('../models/bookingModel');

// Today's Bookings
const todaysBookings = async (params,res) => {
    
    try {
        const shopId = params.shopId;
        
        const date = new Date();
        const currentDate = date.toISOString().split('T')[0];

        const listOfBookings = await Booking.find(
            { "shopDetails.shop_id" : shopId, "bookingDetails.date" : currentDate, status: "In Queue" },
            {_id:0,"customerDetails.customer_id":0,shopDetails:0,createdAt:0,updatedAt:0} ); 
        return res.json(listOfBookings);

        } catch (error) {
         console.log(error)
        return res.status(500).json({
            message: 'Error in retrieving todays bookings.',
            success: true
        });
    }
};

// Advanced booking
const advancedBooking = async (params,res) =>{

    try {
        const shopId = params.shopId;
        
        const date = new Date();
        const currentDate = date.toISOString().split('T')[0];

        const listOfAdvanced_Bookings = await Booking.find(
            { "shopDetails.shop_id" : shopId,
             "bookingDetails.date" : { $gt : currentDate } ,
              status: "In Queue" },
            {_id:0,"customerDetails.customer_id":0,shopDetails:0,createdAt:0,updatedAt:0,__v:0}
            );
        return res.json(listOfAdvanced_Bookings);

        } catch (error) {
         console.log(error)
        return res.status(500).json({
            message: 'Error in retrieving advanced bookings.',
            success: true
        });
    }
};

// Assigning a customer waiting in queue.
const assignCustomer = async (params,res) => {
    
    try {
        const bookingId = params.bookingId;

        const assigned = await Booking.findOneAndUpdate(
            { _id : bookingId },
            { $set : { status: "ACTIVE" }},
            { returnOriginal : false }
        )
        return res.json(assigned);
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Error while assigning the customer.',
            success: true
        });
    }
};

// Check active customer.
const activeCustomers = async (params,res) => {
    
    try {
        const shopId = params.shopId;

        const activeCustomerList = await Booking.find(
            {"shopDetails.shop_id": shopId, status:"ACTIVE"},
            {"customerDetails.customerName":1,status:1,tokenNumber:1}
            );
        return res.json(activeCustomerList);
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Error in retrieving active customers.',
            success: true
        });
    }
};

// Release active customer.
const releaseCustomer = async (params,res) => {
    
    try {
        const bookingId = params.bookingId;

        const released = await Booking.findOneAndUpdate(
            { _id : bookingId, status: "ACTIVE" },
            { $set : { status: "COMPLETED" }},
            { returnOriginal : false }
        )
        return res.json(released);
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Error while releasing the customer.',
            success: true
        });
    }
};

module.exports = { todaysBookings, advancedBooking, assignCustomer, activeCustomers, releaseCustomer };