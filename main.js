const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
const routes = require("./app/routes/index");
const connectDB = require("./app/config/database");

app.use(bodyParser.json());
app.use("/api",routes);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`http://localhost:${port}/`);
  });
});
