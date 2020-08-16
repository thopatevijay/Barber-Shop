const Booking = require('../models/bookingModel');
const User = require('../models/usersModel');

// Customes search shops
const searchShop = async (req,res) => {

    try { 
        const shopList = await User.find(req)
        return res.json(shopList);
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Error in retrieving shops.',
            success: true
        });
    }
}


// Customers book time in the shop.
const bookingTime = async (details,params,res) => {
    try {
        const custId = params.custId;
        const shopId = params.shopId;
        const bookingdate = details['bookingDetails.date'];

        details["customerDetails.customer_id"] = custId;
        details["shopDetails.shop_id"] = shopId;

        // Generating Token Number
        const query = { "shopDetails.shop_id" : shopId, "bookingDetails.date": bookingdate }
        const token = await Booking.countDocuments(query);   
        details.tokenNumber = token + 1;    

        // book new time
        const newBooking = new Booking(details);
        await newBooking.save();
        return res.status(201).json({
        message: "Time Booked successfully.",
        success: true
        });  
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Sorry. Unable to book time.',
            success: true
        });
    }
};

//Customers can check their previous bookings
const previousBookings = async (params,res) => {

    try {
        const custId = params.custId;
        const previousList = await Booking.find(
            { "customerDetails.customer_id" : custId},
            {_id:0, customerDetails:0,"shopDetails.shop_id":0,createdAt:0,updatedAt:0}
            );
        return res.json(previousList);    
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Error in retrieving prevoius bokkings.',
            success: true
        });
    }
};



module.exports = { bookingTime, searchShop, previousBookings };
