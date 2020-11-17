const mongoose = require('mongoose'),
    path = require('path'),
    Schema = mongoose.Schema;

let cartSchema = new Schema({

        productId: {
            type: String,
            trim: true,
            required: [true, 'Product id is required']
        },
        userId: {
            type: String,
            trim: true,
            required: [true, 'User id is required']
        }

    },

    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });


module.exports = mongoose.model('CartModel', cartSchema);