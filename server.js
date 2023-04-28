const express = require("express");
const db = require("./db");
const routes = require("./routes");
const keys = require("./config/keys");

const app = express();

app.use("/api", routes);

app.listen(keys.PORT, () => {
  console.log(`Server started on port ${keys.PORT}...`);
});
