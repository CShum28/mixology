// Load environment variables from .env file
require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.DEV_PORT || 8081;
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

// Middleware Setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
