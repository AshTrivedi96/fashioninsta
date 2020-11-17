const path = require('path'),
    router = require('express').Router(),
    dir = `${path.dirname(__dirname)}/controllers`,
    Utils = require(path.resolve('./utils'));

let ReadDirectory = new Utils.read_directory.readDirectory();

//@ require all controllers for this module
let fileObj = ReadDirectory.requireFiles(dir);


//@ routes mapping
router
    .post('/add', fileObj['product'].add)
    .get('/list', fileObj['product'].list)
    .put('/update/:id', fileObj['product'].update)
    .delete('/:id', fileObj['product'].delete)
    .post('/addToCart/', fileObj['product'].addToCart)
    .get('/cart/:userId', fileObj['product'].cart)
    .delete('/cart/:id', fileObj['product'].removeFromCart)
    .get('/view/:id', fileObj['product'].view);


module.exports = {
    router: router,
    base: '/api/admin/product'
};