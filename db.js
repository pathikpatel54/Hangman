const keys = require("./config/keys");

const mongoose = require("mongoose");

mongoose
  .connect(keys.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

module.exports = mongoose.connection;
