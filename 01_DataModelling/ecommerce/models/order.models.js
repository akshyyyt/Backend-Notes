import mongoose from 'mongoose';

const orderIdSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Prodct'
    },
    quantity: {
        type: Number,
        required: true
    }
}) // Local Schema, we could have just written these all the there only, just a good practise. 

const orderSchema = mongoose.Schema({
    orderPrice: {
        type: Number,
        required: true,
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    orderItems: [orderIdSchema],
    address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Cancel", "Delivered"],
        default: "Pending"
    }
}, {timestamp: true});

export const Order = mongoose.model('Order', orderSchema);