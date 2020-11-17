const mongoose = require('mongoose'),
    path = require('path'),
    Schema = mongoose.Schema;

let productSchema = new Schema({

        name: {
            type: String,
            trim: true,
            required: [true, 'Product name is required']
        },
        sku: {
            type: String,
            unique: true,
            trim: true,
            required: [true, 'Product SKU is required']
        },
        description: {
            type: String,
            trim: true

        },
        category: {
            type: String,
            trim: true

        },
        gender: {
            type: String,
            trim: true

        },
        price: {
            type: Number,
            trim: true

        },
        images: {
            type: String,
            trim: true

        }
    },

    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });


module.exports = mongoose.model('ProductModel', productSchema);