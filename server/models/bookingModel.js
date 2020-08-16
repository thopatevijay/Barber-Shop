const { Schema, model } = require('mongoose');


const bookSchema = new Schema(
    {
        customerDetails:{
            customer_id:{ 
                type: Schema.Types.ObjectId
            },
            customerName:{
                type: String,
                required: true
            },
            customerAddress:{
                type: String,
                required: true
            },
            customerPhone:{
                type: String,
            }
        },
        shopDetails:{
            shop_id:{
                type: Schema.Types.ObjectId
            },
            shopName:{
                type: String,
                required: true
            },
            shopAddress:{
                type: String,
                required: true
            },
            shopLocation:{
                type: String,
            }
        },
        bookingDetails:{
            date:{
                type: Date,
                required: true
            },
            time:{
                type: String,
                required: true
            }
        },
        status:{
            type: String,
            default: "In Queue"
        },
        tokenNumber:{
            type:Number
        }
    },
    { timestamps: true}
)

module.exports = model('bookings', bookSchema);