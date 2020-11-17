const path = require('path'),
	router = require('express').Router(),
	dir = `${path.dirname(__dirname)}/controllers`,
	Utils = require(path.resolve('./utils'));

let ReadDirectory = new Utils.read_directory.readDirectory();

//@ require all controllers for this module
let fileObj = ReadDirectory.requireFiles(dir);


//@ routes mapping
router
	.post('/register', fileObj['admin.account'].register)
	.get('/list', fileObj['admin.account'].list)
	.post('/login', fileObj['admin.account'].login);


module.exports = {
	router: router,
	base: '/api/admin'
};

