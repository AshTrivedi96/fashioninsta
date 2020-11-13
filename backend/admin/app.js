const express = require('express');
app = express(),
    server = require("http").createServer(app),
    path = require("path"),
    registerRoutes = require("./routes"),
    db = require("./database"),
    Express = require("./express"),
    Config = require(path.resolve("./config"));

const config = Config.getConfig();

//@ start server
server.listen(config.PORT, '0.0.0.0', () => {
    console.log(`Node Js server running on ${config.PORT} port at ${config.MODE_TYPE}`);
});

//@ Initialize express
Express.init(app);

//@ connect mongodb
db.connectMongoDB(config);

//@ register routes
console.log("registering routes");
registerRoutes.registerRoutes(app);
console.log("routes registered successfully");

module.exports = app;
