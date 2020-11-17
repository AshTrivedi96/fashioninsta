const mongoose = require("mongoose");

module.exports = (ENV) => {
  mongoose.Promise = global.Promise;
  mongoose.set("debug", ENV.MONGO_DEBUG);

  let url = `mongodb://${ENV.HOST}/${ENV.MONGODB}`;

  /*create mongoDB connection*/
  mongoose.connect(
    url,
    { useMongoClient: true }
  );

  /*if if connection established*/
  mongoose.connection.on("connected", () => {
    console.log(`Successfully connected to mongoDB ${ENV.MONGODB}`);
  });

  /*if unable to connect to DB*/
  mongoose.connection.on("error", err => {
    console.error(`Failed to connect to mongoDB: ${ENV.MONGODB}, ${err}`);
  });

  /*if connection has been break due to any reason*/
  mongoose.connection.on("disconnected", err => {
    console.log(`Default connection to mongoDB: ${ENV.MONGODB} disconnected`);
  });
};
