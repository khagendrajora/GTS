const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    itemName: [{
        type: String,
        required: true,
        trim: true
    }],
    price: {
        type: Number,
        required: true,
        trim: true
    },
    weight: {
        type: Number,
        required: true
    }
}, { timestamps: true })


module.exports = mongoose.model('Item', itemSchema)