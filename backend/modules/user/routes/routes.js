const path = require('path'),
	router = require('express').Router(),
	dir = `${path.dirname(__dirname)}/controllers`,
	Utils = require(path.resolve('./utils'));

let ReadDirectory = new Utils.read_directory.readDirectory();

//@ require all controllers for this module
let fileObj = ReadDirectory.requireFiles(dir);


//@ routes mapping
router
	.post('/register', fileObj['user'].register)
	.get('/', fileObj['user'].list)
	.delete('/:id', fileObj['user'].deleteById)
	.get('/:id', fileObj['user'].getById)
	.put('/:id', fileObj['user'].update)
	.post('/login', fileObj['user'].login);


module.exports = {
	router: router,
	base: '/api/user'
};

