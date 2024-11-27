const express = require("express");
const bodyParser = require("body-parser");

const routes = require("./routes/routes");
const loadModel = require("./helpers/loadModel");

const app = express();

// Set up model
(async () => {
  const model = await loadModel();

  app.model = model;
  console.log("Model telah diinisialisasi")
})();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

const PORT = process.env.PORT || 8000;
const HOST = process.env.NODE_ENV !== "production" ? "localhost" : "0.0.0.0";
app.listen(PORT, HOST);
