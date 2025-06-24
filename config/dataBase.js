const mongoose = require("mongoose");

const db = () => {
  // database
  mongoose
    .connect(
      "mongodb+srv://elmohtarfmo:w07rfnCuQ9IxZxMg@cluster0.jkyw9ph.mongodb.net/talabatBeta?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then((con) => {
      console.log(`db conected: ${con.connection.host}`);
    })
    .catch((err) => {
      console.log(`error db: ${err}`);
    });
};

module.exports = db;
