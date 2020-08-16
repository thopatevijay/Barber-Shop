const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
        },
        role: {
            type: String,
            default: "customer",
            enum : ['customer','shop_owner']
        },
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        shopName: {
            type: String
        },
        address: {
            type: String
        },
        location: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        workingHours: {
            openingTime: {
                type: String
            },
            closingTime: {
                type: String
            }
        },
        availableTimeSlots: []
    },
    { timestamps: true}
)


module.exports = model('users', UserSchema);
