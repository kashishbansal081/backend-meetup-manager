const mongoose = require("mongoose");
require("dotenv").config();

const MongoURL = process.env.MONGODB;

// console.log(MongoURL)

async function dbConnect (){
await mongoose
  .connect(MongoURL)
  .then(() => {
    console.log("Database has been connected successfully.");
  })
  .catch((error) =>
    console.log("Database has not been connected due to error", error)
  );
}

module.exports = dbConnect