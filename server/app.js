const dotenv = require("dotenv");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const router = require("./Routes/router");
const cors = require("cors");

dotenv.config({ path: "./config.env" });

// use middleware to get JSON Data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// connect with database
const DB = process.env.DATABASE;
mongoose
  .connect(DB)
  .then(() => {
    console.log("connection with Database Successfully!");
  })
  .catch((err) => {
    console.log(`Error in Db connection ${err}`);
  });

app.use("/", router);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`port is running at port ${PORT}`);
});
