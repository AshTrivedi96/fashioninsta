'use strict'
const path = require('path'),
    helperLib = require(path.resolve('./utils')),
    ProductModel = require('../models/product.model'),
    CartModel = require('../models/cart.model');


exports.add = (req, res) => {
    let productSchema = new ProductModel(req.body);
    //@ save object to database
    productSchema.save((err, saved) => {

        let resObj = {};
        let Common = new helperLib.common.common();
        if (err) {
            let message = err.code == '11000' ? `${req.body.sku} ${helperLib.messages.alreadyTaken}` : 'Add Product failed';
            resObj = Common.generateResponses(400, 'failed', message, err.code == '11000' ? null : err);
        } else {
            let result = {
                sku: saved.sku,
                created_at: saved.created_at
            }
            resObj = Common.generateResponses(200, 'success', helperLib.messages.productAdded, null, result);
        }

        res.status(resObj.statusCode).json(resObj);

    });
}

exports.list = (req, res) => {
    //@ get all products
    ProductModel.find({}, function(err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.json(result);
        }
    });
}

exports.view = (req, res) => {
    //@ get all products
    ProductModel.findById({ _id: req.params.id }, function(err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.json(result);
        }
    });
}

exports.delete = (req, res) => {
    //@ get all products
    ProductModel.deleteOne({ _id: req.params.id }, function(err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.json(result);
        }
    });
}
exports.update = (req, res) => {
    //@ get all products
    ProductModel.findById({ _id: req.params.id }, function(err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            result.name = req.body.name;
            result.description = req.body.description;
            result.category = req.body.category;
            result.price = req.body.price;
            result.images = req.body.images;
            result.gender = req.body.gender;
            result.save(function(err) {
                if (err)
                    res.json(err);
                else
                    res.json(result);
            });
        }
    });
}


exports.addToCart = (req, res) => {
    //@ add product to cart
    let cartSchema = new CartModel(req.body);
    //@ save object to database
    cartSchema.save((err, saved) => {

        let resObj = {};
        let Common = new helperLib.common.common();
        let result = {
            sku: saved.sku,
            created_at: saved.created_at
        }
        resObj = Common.generateResponses(200, 'success', helperLib.messages.productAdded, null, result);
        res.status(resObj.statusCode).json(resObj);
    });
}

exports.cart = (req, res) => {
    //@ get all products
    CartModel.find({ userId: req.params.userId }, function(err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.json(result);
        }
    });
}

exports.removeFromCart = (req, res) => {
    //@ get all products
    CartModel.deleteOne({ _id: req.params.id }, function(err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.json(result);
        }
    });
}


exports.removeAllProductsFromCart = (req, res) => {
    //@ get all products
    CartModel.deleteMany({ userId: req.params.userId }, function(err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.json(result);
        }
    });
}